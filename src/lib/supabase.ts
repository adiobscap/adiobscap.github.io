// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Temporary hardcoded values for debugging static export issue
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uyhjgvhfkbyjompvokro.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5aGpndmhma2J5am9tcHZva3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NTE3NDYsImV4cCI6MjA3MDIyNzc0Nn0.5phaI8LmcGZJkBv31TqKWaVtiXzrb5Ssi8BYW7OL7-o'

// Debug: Log environment variables (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Key exists:', !!supabaseKey)
}

// Production fallback - check if variables are available
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables!')
  console.error('URL:', supabaseUrl)
  console.error('Key exists:', !!supabaseKey)
  console.error('NODE_ENV:', process.env.NODE_ENV)
  
  // Alert in production for debugging
  if (typeof window !== 'undefined') {
    alert(`Supabase config error: URL=${!!supabaseUrl}, Key=${!!supabaseKey}`)
  }
}

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
  const { error } = await supabase
    .from('contact_submissions')
    .insert([data])
  
  if (error) {
    console.error('Contact form submission failed:', error.message || error);
    throw error;
  }
  
  return { success: true }
}

export async function submitJobApplication(data: JobApplication) {
  console.log('Submitting job application with data:', data);
  
  const { data: application, error } = await supabase
    .from('job_applications')
    .insert([data])
    .select()
    .single()
  
  if (error) {
    console.error('Job application submission failed:', error.message || error);
    console.error('Full error object:', error);
    console.error('Data that failed:', data);
    throw error;
  }
  
  console.log('Job application submitted successfully:', application);
  return application
}

export async function uploadResume(file: File, applicationId: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${applicationId}.${fileExt}`
  
  const { error } = await supabase.storage
    .from('resumes')
    .upload(fileName, file, {
      upsert: true
    })
  
  if (error) {
    console.error('Resume upload failed:', error.message || error);
    throw error;
  }
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('resumes')
    .getPublicUrl(fileName)
  
  return { fileName, publicUrl }
}

export async function submitJobApplicationWithResume(
  applicationData: JobApplication, 
  resumeFile?: File | null
) {
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
        console.error('Failed to update resume info:', updateError.message || updateError)
      }
    } catch (uploadError) {
      console.error('Resume upload failed:', uploadError instanceof Error ? uploadError.message : uploadError)
      // Continue without failing the entire application
    }
  }
  
  return application
}