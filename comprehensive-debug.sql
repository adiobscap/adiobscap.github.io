-- Comprehensive RLS Debug Script
-- This will show us exactly what's happening

-- 1. Check table structure
\d job_applications;
\d contact_submissions;

-- 2. Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity, hasrls 
FROM pg_tables 
WHERE tablename IN ('contact_submissions', 'job_applications');

-- 3. Show ALL policies (including inherited ones)
SELECT 
  n.nspname as schemaname,
  c.relname as tablename,
  pol.polname as policyname,
  pol.polpermissive as permissive,
  pol.polroles as roles,
  pol.polcmd as cmd,
  pol.polqual as qual,
  pol.polwithcheck as with_check
FROM pg_policy pol
JOIN pg_class c ON c.oid = pol.polrelid
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relname IN ('contact_submissions', 'job_applications')
ORDER BY c.relname, pol.polname;

-- 4. Temporarily disable RLS to test (CAREFUL - only for testing)
ALTER TABLE job_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- 5. Verify RLS is disabled
SELECT schemaname, tablename, rowsecurity, hasrls 
FROM pg_tables 
WHERE tablename IN ('contact_submissions', 'job_applications');

-- Note: Remember to re-enable RLS after testing:
-- ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;