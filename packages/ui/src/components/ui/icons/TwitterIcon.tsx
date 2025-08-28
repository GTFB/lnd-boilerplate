import React from 'react'

interface TwitterIconProps {
  className?: string
  size?: number
}

export const TwitterIcon: React.FC<TwitterIconProps> = ({ 
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
        d="M17.8014 3.00903H20.867L14.136 10.6474L22 21.009H15.8287L10.997 14.7124L5.46551 21.009H2.39987L9.53082 12.8393L2 3.00903H8.32456L12.6898 8.76106L17.8014 3.00903ZM16.7284 19.2157H18.4279L7.43152 4.73597H5.60546L16.7284 19.2157Z" 
        fill="currentColor"
      />
    </svg>
  )
}
