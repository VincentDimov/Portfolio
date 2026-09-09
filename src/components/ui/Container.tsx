import type { PropsWithChildren } from 'react'
import { cn } from '../../lib/utils'

type ContainerProps = PropsWithChildren<{ className?: string }>

export const Container = ({ className, children }: ContainerProps) => (
  <div className={cn('container', className)}>{children}</div>
)
