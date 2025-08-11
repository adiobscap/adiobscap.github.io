-- Secure RLS Policies for Form Submissions
-- Copy and paste these commands into your Supabase SQL Editor
-- Go to: Supabase Dashboard → Your Project → SQL Editor → New Query

-- 1. Policy for contact submissions with basic validation
CREATE POLICY "Allow legitimate contact submissions" 
ON contact_submissions 
FOR INSERT 
TO anon 
WITH CHECK (
  -- Ensure required fields are present and reasonable
  name IS NOT NULL 
  AND name != '' 
  AND length(name) <= 100
  AND email IS NOT NULL 
  AND email != '' 
  AND email ~ '^[^@]+@[^@]+\.[^@]+$'  -- Basic email validation
  AND length(email) <= 255
  AND message IS NOT NULL 
  AND message != '' 
  AND length(message) <= 5000
  AND (company IS NULL OR length(company) <= 100)
);

-- 2. Policy for job applications with validation
CREATE POLICY "Allow legitimate job applications"
ON job_applications 
FOR INSERT
TO anon  
WITH CHECK (
  -- Ensure required fields are present and reasonable
  name IS NOT NULL 
  AND name != '' 
  AND length(name) <= 100
  AND email IS NOT NULL 
  AND email != '' 
  AND email ~ '^[^@]+@[^@]+\.[^@]+$'  -- Basic email validation
  AND length(email) <= 255
  AND position IS NOT NULL 
  AND position != ''
  AND length(position) <= 100
  AND position_title IS NOT NULL 
  AND position_title != ''
  AND length(position_title) <= 100
  AND (phone IS NULL OR length(phone) <= 20)
  AND (cover_letter IS NULL OR length(cover_letter) <= 10000)
  -- Only allow specific position values
  AND position IN ('quantitative-trader', 'senior-software-engineer', 'quantitative-research-engineer')
);

-- 3. Policy for resume uploads with file validation
CREATE POLICY "Allow legitimate resume uploads"
ON storage.objects 
FOR INSERT
TO anon
WITH CHECK (
  bucket_id = 'resumes'
  -- Only allow PDF, DOC, DOCX files
  AND (
    (metadata->>'mimetype') = 'application/pdf'
    OR (metadata->>'mimetype') = 'application/msword'
    OR (metadata->>'mimetype') = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  )
);

-- 4. Policy to allow reading resume files (for public URLs)
CREATE POLICY "Allow resume file access"
ON storage.objects 
FOR SELECT
TO anon
USING (bucket_id = 'resumes');

-- 5. Create rate limiting table (optional but recommended)
CREATE TABLE IF NOT EXISTS submission_rate_limit (
  id SERIAL PRIMARY KEY,
  ip_address INET,
  submission_type TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 6. Enable RLS on rate limiting table
ALTER TABLE submission_rate_limit ENABLE ROW LEVEL SECURITY;

-- Verify policies were created successfully
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd
FROM pg_policies 
WHERE tablename IN ('contact_submissions', 'job_applications')
   OR (schemaname = 'storage' AND tablename = 'objects')
ORDER BY tablename, policyname;