import { cn } from '@/lib/utils';
import React from 'react';

interface FlexRowPropType {
  children: React.ReactNode;
  className?: string;
}

const FlexRow = ({ children, className }: FlexRowPropType) => {
  return <div className={cn('flex justify-center items-center', className)}>{children}</div>;
};

export default FlexRow;
