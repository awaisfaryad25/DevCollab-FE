'use client'

import Input from '@/app/ui/Input';
import { ArrowRight, User } from 'lucide-react';
import React, { useState } from 'react'
import FileUpload  from '@/app/ui/FileUpload';

const SubmitResume = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitted, setShowSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string>('');
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
 
    if (!resumeFile) {
      setResumeError('Please attach your resume');
      return;
    }
    setResumeError('');
    setIsSubmitting(true);
 
    // build FormData and submit here
  };
  
  return (
    <div>
            <div className="font-dm-sans relative w-full max-w-7xl mx-auto px-6 md:px-8 xl:px-0">
        {/* Upload Resume Section - Only show if not submitted */}
        {!showSubmitted && (
          <div className="py-8 lg:py-16">
            <div className="flex items-center gap-2 text-text text-[11px] xs:text-sm lg:text-base 2xl:text-xl 4xl:text-2xl">
              <span>Careers</span>
              <ArrowRight size={16} />
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent font-medium">
                Send your resume
              </span>
              <ArrowRight size={16} />
              <span>Submitted</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-8 lg:mt-20">
              <div className="lg:col-span-2 max-w-md">
                <h2 className="text-xl lg:text-3xl 2xl:text-4xl 4xl:text-[44px] lg:leading-11 2xl:leading-13 4xl:leading-16 font-medium">
                  Invest in your Career, <br/> Grow with Dev Collab
                </h2>
              </div>

              {/* Form Section */}
              <div className="lg:col-span-3">
                <form className="flex flex-col gap-6">
                  {/* Display submit error if any */}
                  <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
                    <Input label="First Name" type="text" placeholder="Awais" required />
                    <Input label="Last Name" type="text" placeholder="Faryad" required />
                    <Input label="Email" type="email" placeholder="you@example.com" required />
                    <Input label="Phone Number" type="tel" placeholder="123-456-7890" required />
                  </div>

                  {/* Resume Upload Section */}
                  <FileUpload 
                    label="Upload Resume"
                    accept=".pdf,.doc,.docx"
                    required
                    error={resumeError}
                    onFileSelect={setResumeFile}
                  />
                  

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="gradient text-white px-4 py-3.5 rounded-lg font-medium text-sm 2xl:text-base mt-4 disabled:opacity-50 disabled:cursor-not-allowed  transition-colors"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* {showSubmitted && (
          <ResumeSubmitted/>
        )} */}

      </div>
    </div>
  )
}

export default SubmitResume