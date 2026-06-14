import React from 'react'

const BackgroundGradient = () => {
  return (
    <>
      {/* Top Right Gradient */}
      <div className="absolute sm:top-15 sm:right-50 w-[10vw] h-[10vw] max-w-50 max-h-50 rounded-full bg-[#0EA5E9] opacity-40 blur-[100px] pointer-events-none" />
      <div className="absolute sm:top-45 sm:right-20 w-[10vw] h-[10vw] max-w-50 max-h-50 rounded-full bg-[rgba(238,16,229,0.6)] opacity-60 blur-[100px] pointer-events-none"/>
      
      {/* Bottom Left Gradient */}
      <div className="absolute sm:bottom-45 sm:left-30 w-[10vw] h-[10vw] max-w-50 max-h-50 rounded-full bg-[#0EA5E9] opacity-40 blur-[100px] pointer-events-none" />
      <div className="absolute sm:bottom-12 sm:left-80 w-[10vw] h-[10vw] max-w-50 max-h-50 rounded-full bg-[rgba(238,16,229,0.6)] opacity-60 blur-[100px] pointer-events-none"
      />
    </>
  )
}

export default BackgroundGradient