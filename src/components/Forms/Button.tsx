import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string
  children?: ReactNode
}

const Button = ({ name, children, ...rest }: Props) => {
  return (
    <button
      className={clsx(
        'px-3 py-2 text-sm font-medium text-center text-white rounded-none',
        'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300',
        'dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      )}
      {...rest}
    >
      {children}
      {name}
    </button>
  )
}

export default Button
