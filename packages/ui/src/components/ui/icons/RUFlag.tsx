import React from 'react'

export const RUFlag: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 640 480"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="#fff" d="M0 0h640v480H0z"/>
    <path fill="#0039a6" d="M0 160h640v160H0z"/>
    <path fill="#d52b1e" d="M0 320h640v160H0z"/>
  </svg>
)
