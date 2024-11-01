import { cn } from '@/lib/utils';
import React from 'react';

interface FlexColPropType {
  children: React.ReactNode;
  className?: string;
}

const FlexCol = ({ children, className }: FlexColPropType) => {
  return (
    <div className={cn('flex flex-col justify-center items-center', className)}>{children}</div>
  );
};

export default FlexCol;
