import React from 'react'

export const FRFlag: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 640 480"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="#fff" d="M0 0h640v480H0z"/>
    <path fill="#002654" d="M0 0h213.3v480H0z"/>
    <path fill="#ed2939" d="M426.7 0H640v480H426.7z"/>
  </svg>
)
