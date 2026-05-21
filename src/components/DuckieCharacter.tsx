import React, { useRef, useEffect } from 'react'

interface DuckieCharacterProps {
  isThinking?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const DuckieCharacter: React.FC<DuckieCharacterProps> = ({ isThinking = false, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  }

  const svgSize = {
    sm: '64',
    md: '96',
    lg: '128'
  }

  return (
    <div className={`flex flex-col items-center gap-2 ${isThinking ? 'animate-bounce_soft' : ''}`}>
      {/* SVG Duckie */}
      <svg
        viewBox="0 0 100 100"
        width={svgSize[size]}
        height={svgSize[size]}
        className="drop-shadow-lg"
      >
        {/* Body */}
        <circle cx="50" cy="60" r="30" fill="#FFD700" stroke="#DAA520" strokeWidth="2" />

        {/* Head */}
        <circle cx="50" cy="30" r="22" fill="#FFD700" stroke="#DAA520" strokeWidth="2" />

        {/* Eyes */}
        <circle cx="43" cy="25" r="4" fill="#000" />
        <circle cx="57" cy="25" r="4" fill="#000" />

        {/* Eye shine */}
        <circle cx="43.5" cy="23.5" r="1.5" fill="#fff" />
        <circle cx="57.5" cy="23.5" r="1.5" fill="#fff" />

        {/* Beak */}
        <path d="M 50 32 L 56 35 L 50 37 Z" fill="#FFB347" stroke="#DAA520" strokeWidth="1" />

        {/* Cheeks */}
        <circle cx="30" cy="32" r="5" fill="#FFA07A" opacity="0.6" />
        <circle cx="70" cy="32" r="5" fill="#FFA07A" opacity="0.6" />

        {/* Wings */}
        <ellipse cx="25" cy="55" rx="8" ry="15" fill="#FFC700" stroke="#DAA520" strokeWidth="1.5" transform="rotate(-20 25 55)" />
        <ellipse cx="75" cy="55" rx="8" ry="15" fill="#FFC700" stroke="#DAA520" strokeWidth="1.5" transform="rotate(20 75 55)" />

        {/* Feet */}
        <g>
          <circle cx="40" cy="88" r="4" fill="#FFB347" stroke="#DAA520" strokeWidth="1" />
          <circle cx="60" cy="88" r="4" fill="#FFB347" stroke="#DAA520" strokeWidth="1" />
        </g>
      </svg>

      {/* Thinking indicator */}
      {isThinking && (
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-duckie-yellow rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-duckie-yellow rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-duckie-yellow rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      )}
    </div>
  )
}
