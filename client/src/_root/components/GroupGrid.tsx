import { MagicCard } from '@/components/magicui/magic-card';

const GroupGrid = () => {
  return (
    <div className="grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto mt-8 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
      <MagicCard
        className="cursor-pointer bg-PATRON_DARK_GRAY flex-col items-center justify-center p-20 border border-PATRON_BORDER_COLOR"
        gradientColor={'#262626'}
      >
        Magic
      </MagicCard>
      <MagicCard
        className="cursor-pointer bg-PATRON_DARK_GRAY flex-col items-center justify-center p-20 border-PATRON_BORDER_COLOR"
        gradientColor={'#262626'}
      >
        Magic
      </MagicCard>
      <MagicCard
        className="cursor-pointer bg-PATRON_DARK_GRAY flex-col items-center justify-center p-20 border-PATRON_BORDER_COLOR"
        gradientColor={'#262626'}
      >
        Magic
      </MagicCard>
      <MagicCard
        className="cursor-pointer bg-PATRON_DARK_GRAY flex-col items-center justify-center p-20 border-PATRON_BORDER_COLOR"
        gradientColor={'#262626'}
      >
        Magic
      </MagicCard>
      <MagicCard
        className="cursor-pointer bg-PATRON_DARK_GRAY flex-col items-center justify-center p-20 border-PATRON_BORDER_COLOR"
        gradientColor={'#262626'}
      >
        Magic
      </MagicCard>
      <MagicCard
        className="cursor-pointer bg-PATRON_DARK_GRAY flex-col items-center justify-center p-20 border-PATRON_BORDER_COLOR"
        gradientColor={'#262626'}
      >
        Magic
      </MagicCard>
    </div>
  );
};

export default GroupGrid;
