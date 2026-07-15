'use client'

import { UploadCloud, FileText, X } from 'lucide-react'
import React, { useRef, useState, useCallback } from 'react'

interface ResumeUploadProps {
  label?: string
  accept?: string
  maxSizeMB?: number
  required?: boolean
  onFileSelect?: (file: File | null) => void
  error?: string
}

const FileUpload  = ({
  label = 'Upload Resume',
  accept = '.pdf,.doc,.docx',
  maxSizeMB = 5,
  required = false,
  onFileSelect,
  error,
}: ResumeUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const validateAndSetFile = useCallback(
    (candidate: File | null) => {
      if (!candidate) {
        setFile(null)
        onFileSelect?.(null)
        return
      }

      const allowedExt = accept.split(',').map((ext) => ext.trim().toLowerCase())
      const fileExt = `.${candidate.name.split('.').pop()?.toLowerCase()}`

      if (!allowedExt.includes(fileExt)) {
        setLocalError(`Only ${accept} files are supported`)
        return
      }

      if (candidate.size > maxSizeMB * 1024 * 1024) {
        setLocalError(`File must be smaller than ${maxSizeMB}MB`)
        return
      }

      setLocalError(null)
      setFile(candidate)
      onFileSelect?.(candidate)
    },
    [accept, maxSizeMB, onFileSelect]
  )

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files?.[0] ?? null
    validateAndSetFile(dropped)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null
    validateAndSetFile(selected)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    validateAndSetFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const displayError = localError ?? error

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-text text-sm font-medium">
          {label}
          {required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`
          relative flex flex-col items-center justify-center gap-2
          rounded-lg border border-dashed px-4 py-6 text-center cursor-pointer
          transition-colors
          ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 bg-white'}
          ${displayError ? 'border-danger' : ''}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        {!file ? (
          <>
            <UploadCloud className="w-6 h-6 text-primary" />
            <p className="text-sm text-text">
              <span className="font-medium bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Click to upload
              </span>{' '}
              or drag and drop
            </p>
            <p className="text-xs text-text/80">
              {accept.replaceAll('.', '').toUpperCase().split(',').join(', ')} <span>({maxSizeMB}MB max) </span> 
            </p>
          </>
        ) : (
          <div className="flex items-center justify-between w-full gap-3 rounded-md bg-primary/5 px-3 py-2">
            <div className="flex items-center gap-2 min-w-0">
              <FileText className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm text-text truncate">{file.name}</span>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove file"
              className="text-text/50 hover:text-danger transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {displayError && <span className="text-xs text-danger">{displayError}</span>}
    </div>
  )
}

export default FileUpload ;