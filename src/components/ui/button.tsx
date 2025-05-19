import React from 'react'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'filled' | 'outline'
}

export const Button: React.FC<ButtonProps> = ({ variant = 'filled', children, ...props }) => {
  const base = 'font-medium rounded DEFAULT px-4 py-2 transition'
  const styles =
    variant === 'filled'
      ? 'bg-primary text-white hover:opacity-90'
      : 'border border-primary text-primary hover:bg-primary hover:text-white'

  return (
    <button className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  )
}
