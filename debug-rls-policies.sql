-- Debug RLS Policies
-- Run this first to check if policies exist and debug the issue

-- 1. Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('contact_submissions', 'job_applications');

-- 2. Check existing policies
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd,
  with_check
FROM pg_policies 
WHERE tablename IN ('contact_submissions', 'job_applications')
ORDER BY tablename, policyname;

-- 3. Drop any existing policies to start fresh (if they exist)
DROP POLICY IF EXISTS "Allow legitimate job applications" ON job_applications;
DROP POLICY IF EXISTS "Allow anonymous job applications" ON job_applications;
DROP POLICY IF EXISTS "Allow legitimate contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous contact submissions" ON contact_submissions;

-- 4. Create a simple test policy first (to verify basic functionality)
CREATE POLICY "Test job applications - allow all"
ON job_applications 
FOR INSERT
TO anon  
WITH CHECK (true);

-- 5. Create a simple test policy for contact submissions
CREATE POLICY "Test contact submissions - allow all"
ON contact_submissions 
FOR INSERT
TO anon  
WITH CHECK (true);

-- 6. Verify the test policies were created
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd
FROM pg_policies 
WHERE tablename IN ('contact_submissions', 'job_applications')
ORDER BY tablename, policyname;