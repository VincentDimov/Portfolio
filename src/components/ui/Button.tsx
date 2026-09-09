import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/utils'

type CommonProps = PropsWithChildren<{
  variant?: 'primary' | 'secondary' | 'quiet'
  icon?: boolean
  className?: string
}>

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>

const classes = (variant: CommonProps['variant'], className?: string) =>
  cn('button', `button--${variant ?? 'primary'}`, className)

export const Button = ({ children, variant = 'primary', icon = false, className, ...props }: ButtonProps) => (
  <button className={classes(variant, className)} {...props}>
    <span>{children}</span>
    {icon && <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />}
  </button>
)

export const ButtonLink = ({ children, variant = 'primary', icon = false, className, ...props }: LinkProps) => (
  <a className={classes(variant, className)} {...props}>
    <span>{children}</span>
    {icon && <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />}
  </a>
)
