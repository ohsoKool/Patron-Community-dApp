import { useAddUserToGroup, useGeneratePresignedUrl, useGetAllGroups } from '@/lib/query/query';
import { useEffect, useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { GroupType } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
// import { generatePreSignedUrls } from '@/lib/api';
import useWalletStore from '@/lib/zustand/WalletStore';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { generatePreSignedUrls } from '@/lib/api';

const BORDER_COLORS = [
  'text-PATRON_CYAN',
  'text-PATRON_GREEN',
  'text-PATRON_PURPLE',
  'text-PATRON_YELLOW',
];

const GroupGrid = () => {
  const [groups, setGroups] = useState<GroupType[] | null>(null);
  const { mutateAsync: getAllGroups, isPending: isGetting } = useGetAllGroups();
  const { isPending: isGenerating } = useGeneratePresignedUrl();
  const { walletAddress } = useWalletStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutateAsync: addUserToGroup } = useAddUserToGroup();

  useEffect(() => {
    getAllGroups().then((response) => {
      generatePreSignedUrls(response).then((response) => {
        setGroups(response);
      });
      // setGroups(response);
    });
  }, []);

  const handleJoin = async (groupId: string) => {
    const response = await addUserToGroup({
      groupId: groupId,
      walletAddress: walletAddress?.toString()!,
    });

    console.log('RESPONSE: ', response);

    if (response.statusCode === 200) {
      navigate(`/group/${groupId}`);
      toast({
        title: 'Add user to group',
      });
    } else if (response.statusCode === 433) {
      toast({
        title: 'User already Exist in group',
      });
    }
  };

  return (
    <ul className="grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto mt-8 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
      {isGetting ? (
        <Skeleton className="cursor-pointer flex rounded-lg bg-PATRON_DARK_GRAY flex-col items-center justify-start border border-PATRON_BORDER_COLOR">
          <AspectRatio ratio={3 / 1} className="w-full">
            <Skeleton className="h-full w-full object-cover rounded-t-lg" />
          </AspectRatio>
          <Skeleton className="mx-2 px-3 py-2 mt-1 w-1/3 self-start my-3 h-6"></Skeleton>
          <DropdownMenuSeparator className="bg-PATRON_BORDER_COLOR w-full" />
          <Skeleton className="text-xs text-PATRON_TEXT_WHITE_SECONDARY/60 text-start p-2 ml-2 pb-4 w-11/12 h-10 self-start my-3"></Skeleton>
        </Skeleton>
      ) : (
        <>
          {groups?.map((each) => (
            <li
              key={each.groupDescription}
              className={
                'cursor-pointer flex rounded-lg bg-PATRON_DARK_GRAY flex-col items-center justify-start border border-PATRON_BORDER_COLOR'
              }
              onClick={() => {
                navigate(`/group/${each.id}`);
              }}
            >
              <AspectRatio ratio={3 / 1} className="w-full">
                {isGenerating ? (
                  <Skeleton className="h-full w-full object-cover rounded-t-lg" />
                ) : (
                  <img
                    src={
                      each.groupCoverImage ||
                      'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'
                    }
                    alt={each.groupName}
                    className="h-full w-full object-cover rounded-t-lg"
                  />
                )}
              </AspectRatio>
              <div className="flex items-center justify-between w-full px-3">
                <h2 className=" w-full text-start text-xl font-changa font-medium py-2 mt-1 text-PATRON_TEXT_WHITE_PRIMARY">
                  {each.groupName}
                </h2>
                <Button
                  className={
                    'h-5 w-16 text-[10px] bg-PATRON_BLACK font-medium ' +
                    BORDER_COLORS[Number(each.groupDescription.length % 3)]
                  }
                  onClick={() => handleJoin(each.id)}
                >
                  Join
                </Button>
              </div>
              <DropdownMenuSeparator className="bg-PATRON_BORDER_COLOR w-full" />
              <p className="text-xs text-PATRON_TEXT_WHITE_SECONDARY/60 text-start p-2">
                {each.groupDescription.slice(0, 100) + '....'}
              </p>
              <DropdownMenuSeparator className="bg-PATRON_BORDER_COLOR" />
              <div className="w-full flex items-center p-3">
                <p className="text-sm text-PATRON_TEXT_WHITE_SECONDARY/60 text-start py-2 w-full">
                  {each.members?.length} Members
                </p>
                <Link to={`/group/${each.id}`}>
                  <ExternalLink color="#fff" size={17} className="ml-3" />
                </Link>
              </div>
            </li>
          ))}
        </>
      )}
    </ul>
  );
};

export default GroupGrid;
