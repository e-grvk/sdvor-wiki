import React from 'react'

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <input
    ref={ref}
    className="border border-gray-300 rounded DEFAULT px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
    {...props}
  />
))
Input.displayName = 'Input'
