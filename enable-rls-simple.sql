-- Re-enable RLS and create simple policies

-- 1. Enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 2. Drop any existing policies first
DROP POLICY IF EXISTS "Test job applications - allow all" ON job_applications;
DROP POLICY IF EXISTS "Test contact submissions - allow all" ON contact_submissions;

-- 3. Create simple allow-all policies for testing
CREATE POLICY "Allow all job applications"
ON job_applications 
FOR INSERT
TO anon  
WITH CHECK (true);

CREATE POLICY "Allow all contact submissions"
ON contact_submissions 
FOR INSERT
TO anon  
WITH CHECK (true);

-- 4. Allow resume uploads
CREATE POLICY "Allow all resume uploads"
ON storage.objects 
FOR INSERT
TO anon
WITH CHECK (bucket_id = 'resumes');

-- 5. Allow reading resumes
CREATE POLICY "Allow all resume reads"
ON storage.objects 
FOR SELECT
TO anon
USING (bucket_id = 'resumes');

-- 6. Verify policies exist
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  cmd
FROM pg_policies 
WHERE tablename IN ('contact_submissions', 'job_applications')
ORDER BY tablename, policyname;