import type { PropsWithChildren } from 'react'
import { cn } from '../../lib/utils'

type BadgeProps = PropsWithChildren<{ className?: string }>

export const Badge = ({ className, children }: BadgeProps) => <span className={cn('badge', className)}>{children}</span>
