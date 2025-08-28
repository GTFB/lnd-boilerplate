import React from 'react'

export const DEFlag: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 640 480"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="#ffce00" d="M0 320h640v160H0z"/>
    <path fill="#000" d="M0 0h640v160H0z"/>
    <path fill="#d00" d="M0 160h640v160H0z"/>
  </svg>
)
