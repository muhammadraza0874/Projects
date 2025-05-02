
import React from 'react';
import { cn } from '@/lib/utils';

interface ChipLabelProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
}

const ChipLabel: React.FC<ChipLabelProps> = ({
  children,
  className,
  variant = 'default',
}) => {
  return (
    <span
      className={cn(
        'chip',
        variant === 'default' && 'bg-secondary text-secondary-foreground',
        variant === 'primary' && 'bg-primary text-primary-foreground',
        variant === 'secondary' && 'bg-muted text-muted-foreground',
        variant === 'outline' && 'bg-transparent border border-border',
        className
      )}
    >
      {children}
    </span>
  );
};

export default ChipLabel;
