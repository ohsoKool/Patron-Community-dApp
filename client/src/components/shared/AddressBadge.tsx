import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const AddressBadge = ({
  address,
  className,
  from = 8,
}: {
  address: string;
  className?: string;
  from?: number;
}) => {
  return (
    <Badge
      variant={'secondary'}
      className={cn(
        'h-6 ml-1 border-PATRON_BORDER_COLOR cursor-pointer bg-PATRON_LIGHT_GRAY text-PATRON_TEXT_WHITE_SECONDARY hover:text-PATRON_TEXT_WHITE_PRIMARY ',
        className
      )}
    >
      {address.slice(0, from) + '...' + address.slice(from, address.length - 30)}
    </Badge>
  );
};

export default AddressBadge;
