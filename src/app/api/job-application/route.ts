import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    // Initialize Supabase client inside the handler
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const formData = await request.formData();
    console.log('Job application submission received');

    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const position_title = formData.get('position_title') as string;
    const cover_letter = formData.get('cover_letter') as string;
    const resumeFile = formData.get('resume') as File | null;

    // Validate required fields
    if (!name || !email || !position || !position_title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate resume file if provided
    if (resumeFile && resumeFile.size > 0) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(resumeFile.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed.' },
          { status: 400 }
        );
      }

      if (resumeFile.size > 5 * 1024 * 1024) { // 5MB limit
        return NextResponse.json(
          { error: 'File too large. Maximum size is 5MB.' },
          { status: 400 }
        );
      }
    }

    // Insert job application into database
    const { data: application, error: insertError } = await supabaseAdmin
      .from('job_applications')
      .insert([{
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        position: position.trim(),
        position_title: position_title.trim(),
        cover_letter: cover_letter?.trim() || null,
        status: 'pending'
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      );
    }

    // Upload resume file if provided
    if (resumeFile && resumeFile.size > 0) {
      try {
        const fileExt = resumeFile.name.split('.').pop();
        const fileName = `${application.id}.${fileExt}`;
        
        const { error: uploadError } = await supabaseAdmin.storage
          .from('resumes')
          .upload(fileName, resumeFile, {
            upsert: true
          });

        if (uploadError) {
          console.error('File upload error:', uploadError);
        } else {
          // Get public URL and update application record
          const { data: { publicUrl } } = supabaseAdmin.storage
            .from('resumes')
            .getPublicUrl(fileName);

          await supabaseAdmin
            .from('job_applications')
            .update({
              resume_filename: fileName,
              resume_url: publicUrl
            })
            .eq('id', application.id);

          console.log('Resume uploaded successfully:', fileName);
        }
      } catch (uploadError) {
        console.error('Resume upload failed:', uploadError);
        // Don't fail the entire application if resume upload fails
      }
    }

    console.log('Job application submitted successfully:', application.id);
    return NextResponse.json({ success: true, id: application.id });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}