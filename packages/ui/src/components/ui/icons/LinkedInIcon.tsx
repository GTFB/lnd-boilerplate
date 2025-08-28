import React from 'react'

interface LinkedInIconProps {
  className?: string
  size?: number
}

export const LinkedInIcon: React.FC<LinkedInIconProps> = ({ 
  className = '', 
  size = 24 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M19.7778 22.009H4.22222C2.99492 22.009 2 21.0141 2 19.7868V4.23126C2 3.00396 2.99492 2.00903 4.22222 2.00903H19.7778C21.0051 2.00903 22 3.00396 22 4.23126V19.7868C22 21.0141 21.0051 22.009 19.7778 22.009ZM16.1234 19.009H19V13.0997C19 10.5995 17.5827 9.39055 15.603 9.39055C13.6224 9.39055 12.7889 10.9329 12.7889 10.9329V9.6757H10.0167V19.009H12.7889V14.1096C12.7889 12.7968 13.3932 12.0156 14.5498 12.0156C15.613 12.0156 16.1234 12.7663 16.1234 14.1096V19.009ZM5 6.7313C5 7.6824 5.76517 8.45358 6.70944 8.45358C7.65371 8.45358 8.41842 7.6824 8.41842 6.7313C8.41842 5.78021 7.65371 5.00903 6.70944 5.00903C5.76517 5.00903 5 5.78021 5 6.7313ZM8.16868 19.009H5.27799V9.6757H8.16868V19.009Z" 
        fill="currentColor"
      />
    </svg>
  )
}
