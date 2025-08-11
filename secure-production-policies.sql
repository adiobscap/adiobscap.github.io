-- Secure Production RLS Policies
-- Step-by-step safe policy creation

-- Step 1: Re-enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Step 2: Clean slate - remove any existing policies
DO $$
BEGIN
    -- Drop policies if they exist (ignore errors if they don't)
    BEGIN
        DROP POLICY IF EXISTS "Allow all job applications" ON job_applications;
        DROP POLICY IF EXISTS "Allow all contact submissions" ON contact_submissions;
        DROP POLICY IF EXISTS "Allow secure job applications" ON job_applications;
        DROP POLICY IF EXISTS "Allow secure contact submissions" ON contact_submissions;
        DROP POLICY IF EXISTS "Allow legitimate job applications" ON job_applications;
        DROP POLICY IF EXISTS "Allow legitimate contact submissions" ON contact_submissions;
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Some policies did not exist, continuing...';
    END;
END $$;

-- Step 3: Create simple but secure policies
-- Job Applications Policy
CREATE POLICY "Allow secure job applications"
ON job_applications 
FOR INSERT
TO anon
WITH CHECK (
    -- Basic validation: required fields are present and reasonable
    name IS NOT NULL 
    AND length(trim(name)) > 0 
    AND length(trim(name)) <= 100
    AND email IS NOT NULL 
    AND length(trim(email)) > 0
    AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'  -- Email regex
    AND length(trim(email)) <= 255
    AND position IS NOT NULL 
    AND length(trim(position)) > 0
    AND position_title IS NOT NULL 
    AND length(trim(position_title)) > 0
    -- Allow only your specific positions
    AND position IN ('quantitative-trader', 'senior-software-engineer', 'quantitative-research-engineer')
);

-- Contact Submissions Policy  
CREATE POLICY "Allow secure contact submissions"
ON contact_submissions 
FOR INSERT
TO anon
WITH CHECK (
    -- Basic validation: required fields are present and reasonable
    name IS NOT NULL 
    AND length(trim(name)) > 0 
    AND length(trim(name)) <= 100
    AND email IS NOT NULL 
    AND length(trim(email)) > 0
    AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'  -- Email regex
    AND length(trim(email)) <= 255
    AND message IS NOT NULL 
    AND length(trim(message)) > 0 
    AND length(trim(message)) <= 5000
);

-- Step 4: Storage policies for resumes (if needed)
-- Clean existing storage policies
DO $$
BEGIN
    BEGIN
        DROP POLICY IF EXISTS "Allow all resume uploads" ON storage.objects;
        DROP POLICY IF EXISTS "Allow all resume reads" ON storage.objects;
        DROP POLICY IF EXISTS "Allow secure resume uploads" ON storage.objects;
        DROP POLICY IF EXISTS "Allow secure resume reads" ON storage.objects;
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Some storage policies did not exist, continuing...';
    END;
END $$;

-- Resume upload policy
CREATE POLICY "Allow secure resume uploads"
ON storage.objects 
FOR INSERT
TO anon
WITH CHECK (
    bucket_id = 'resumes'
    AND (metadata->>'mimetype') IN (
        'application/pdf',
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
);

-- Resume read policy (for public URLs)
CREATE POLICY "Allow secure resume reads"
ON storage.objects 
FOR SELECT
TO anon
USING (bucket_id = 'resumes');

-- Step 5: Verify all policies were created
SELECT 
    'TABLE POLICIES' as policy_type,
    schemaname, 
    tablename, 
    policyname, 
    cmd,
    CASE 
        WHEN with_check IS NOT NULL THEN 'Has validation'
        ELSE 'No validation'
    END as validation_status
FROM pg_policies 
WHERE tablename IN ('contact_submissions', 'job_applications')

UNION ALL

SELECT 
    'STORAGE POLICIES' as policy_type,
    schemaname, 
    tablename, 
    policyname, 
    cmd,
    CASE 
        WHEN with_check IS NOT NULL THEN 'Has validation'
        ELSE 'No validation'
    END as validation_status
FROM pg_policies 
WHERE schemaname = 'storage' AND tablename = 'objects'

ORDER BY policy_type, tablename, policyname;