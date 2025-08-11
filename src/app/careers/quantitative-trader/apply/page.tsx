// app/careers/quantitative-trader/apply/page.tsx
'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function QuantitativeTraderApplyPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { submitJobApplicationWithResume } = await import('@/lib/supabase');
      
      const applicationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        position: 'quantitative-trader',
        position_title: 'Quantitative Trader',
        cover_letter: formData.coverLetter || undefined,
      };

      await submitJobApplicationWithResume(applicationData, formData.resume);
      
      setSubmitStatus('success');
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        resume: null, 
        coverLetter: '' 
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      console.error('Error type:', typeof error);
      
      // Type-safe error property access
      if (error && typeof error === 'object' && error !== null) {
        const errorObj = error as Record<string, unknown>;
        console.error('Error constructor:', errorObj.constructor?.toString());
        console.error('Error message:', errorObj.message);
        console.error('Error code:', errorObj.code);
        console.error('Error details:', errorObj.details);
        console.error('Error hint:', errorObj.hint);
        console.error('Object keys:', Object.keys(errorObj));
        console.error('Object values:', Object.values(errorObj));
        
        for (const key in errorObj) {
          console.error(`error.${key}:`, errorObj[key]);
        }
      }
      
      console.error('JSON stringify:', JSON.stringify(error, null, 2));
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resume: file }));
  };

  return (
    <div className="min-h-screen bg-smoky-black text-white py-24">
      <div className="max-w-2xl mx-auto px-8">
        {/* Back Button */}
        <Link 
          href="/careers/quantitative-trader" 
          className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Job Description
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-title text-4xl md:text-5xl font-bold mb-4">Apply for Position</h1>
          <p className="text-xl text-white/80">Quantitative Trader</p>
          {/* Debug info - make it more visible */}
          <div className="bg-red-500/20 border border-red-500/30 rounded p-2 mt-4 text-sm text-red-300">
            <strong>DEBUG:</strong> URL={!!process.env.NEXT_PUBLIC_SUPABASE_URL ? 'YES' : 'NO'} | KEY={!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'YES' : 'NO'}
            <br />
            URL Value: {process.env.NEXT_PUBLIC_SUPABASE_URL || 'MISSING'}
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400">
              Thank you! Your application has been submitted successfully. We&apos;ll review it and get back to you soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
              Sorry, there was an error submitting your application. Please try again.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                placeholder="Enter your email address"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-white/80 mb-2">
                Resume/CV *
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                />
              </div>
              <p className="text-xs text-white/60 mt-1">
                Accepted formats: PDF, DOC, DOCX (Max size: 5MB)
              </p>
            </div>

            {/* Cover Letter */}
            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-white/80 mb-2">
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows={6}
                value={formData.coverLetter}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors resize-vertical"
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-purple-400 disabled:to-blue-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-white/20 text-center">
            <p className="text-sm text-white/60">
              By submitting this application, you agree to our processing of your personal data for recruitment purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}