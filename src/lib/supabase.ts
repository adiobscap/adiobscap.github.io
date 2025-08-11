// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Types for our database tables
export interface ContactSubmission {
  id?: string
  name: string
  email: string
  company?: string
  phone?: string
  message: string
  status?: 'unread' | 'read' | 'responded'
  created_at?: string
  updated_at?: string
}

export interface JobApplication {
  id?: string
  name: string
  email: string
  phone?: string
  position: string
  position_title: string
  resume_filename?: string
  resume_url?: string
  cover_letter?: string
  status?: 'pending' | 'reviewing' | 'interviewed' | 'hired' | 'rejected'
  created_at?: string
  updated_at?: string
}

// Helper functions
export async function submitContactForm(data: ContactSubmission) {
  console.log('Attempting to submit contact form with data:', data);
  
  const { error } = await supabase
    .from('contact_submissions')
    .insert([data])
  
  if (error) {
    console.error('Supabase error in submitContactForm:', error);
    console.error('Error type:', typeof error);
    console.error('Error keys:', Object.keys(error));
    console.error('Error values:', Object.values(error));
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error details:', error.details);
    console.error('Error hint:', error.hint);
    console.error('JSON stringify:', JSON.stringify(error, null, 2));
    throw error;
  }
  
  console.log('Contact form submitted successfully');
  return { success: true }
}

export async function submitJobApplication(data: JobApplication) {
  console.log('Attempting to submit job application with data:', data);
  
  const { data: application, error } = await supabase
    .from('job_applications')
    .insert([data])
    .select()
    .single()
  
  if (error) {
    console.error('Supabase error in submitJobApplication:', error);
    console.error('Error type:', typeof error);
    console.error('Error keys:', Object.keys(error));
    console.error('Error values:', Object.values(error));
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error details:', error.details);
    console.error('Error hint:', error.hint);
    console.error('JSON stringify:', JSON.stringify(error, null, 2));
    throw error;
  }
  
  console.log('Job application submitted successfully:', application);
  return application
}

export async function uploadResume(file: File, applicationId: string) {
  console.log('Attempting to upload resume:', { fileName: file.name, applicationId, fileSize: file.size });
  
  const fileExt = file.name.split('.').pop()
  const fileName = `${applicationId}.${fileExt}`
  
  const { error } = await supabase.storage
    .from('resumes')
    .upload(fileName, file, {
      upsert: true
    })
  
  if (error) {
    console.error('Supabase error in uploadResume:', error);
    throw error;
  }
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('resumes')
    .getPublicUrl(fileName)
  
  console.log('Resume uploaded successfully:', { fileName, publicUrl });
  return { fileName, publicUrl }
}

export async function submitJobApplicationWithResume(
  applicationData: JobApplication, 
  resumeFile?: File | null
) {
  console.log('Starting submitJobApplicationWithResume process');
  console.log('Application data:', applicationData);
  console.log('Resume file:', resumeFile ? { name: resumeFile.name, size: resumeFile.size } : 'No file');
  
  // Submit application first
  const application = await submitJobApplication(applicationData)
  
  // Upload resume if provided
  if (resumeFile && resumeFile.size > 0) {
    try {
      const { fileName, publicUrl } = await uploadResume(resumeFile, application.id)
      
      // Update application with resume info
      const { error: updateError } = await supabase
        .from('job_applications')
        .update({
          resume_filename: fileName,
          resume_url: publicUrl
        })
        .eq('id', application.id)
      
      if (updateError) {
        console.error('Error updating resume info:', updateError)
      } else {
        console.log('Resume info updated successfully in application');
      }
    } catch (uploadError) {
      console.error('Error uploading resume:', uploadError)
      // Continue without failing the entire application
    }
  }
  
  console.log('submitJobApplicationWithResume completed successfully');
  return application
}