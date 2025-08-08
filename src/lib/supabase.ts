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
  const { error } = await supabase
    .from('contact_submissions')
    .insert([data])
  
  if (error) throw error
  return { success: true }
}

export async function submitJobApplication(data: JobApplication) {
  const { data: application, error } = await supabase
    .from('job_applications')
    .insert([data])
    .select()
    .single()
  
  if (error) throw error
  return application
}

export async function uploadResume(file: File, applicationId: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${applicationId}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('resumes')
    .upload(fileName, file, {
      upsert: true
    })
  
  if (error) throw error
  
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
        console.error('Error updating resume info:', updateError)
      }
    } catch (uploadError) {
      console.error('Error uploading resume:', uploadError)
      // Continue without failing the entire application
    }
  }
  
  return application
}