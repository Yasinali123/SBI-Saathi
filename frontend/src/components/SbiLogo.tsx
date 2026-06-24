import React from 'react';

export const SbiLogo = ({ className = 'w-6 h-6' }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 500 500" 
      className={className}
    >
      <path 
        fill="currentColor" 
        d="m234,499a249,249 0 1,1 32,0V295a45,45 0 1,0-32,0"
      />
    </svg>
  );
};
