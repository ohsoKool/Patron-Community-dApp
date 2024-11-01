import {
  useAddUserToGroup,
  useGenerateGroupPreSignedUrls,
  useGetAllGroups,
} from '@/lib/query/query';
import { useEffect, useState } from 'react';

import useWalletStore from '@/lib/zustand/WalletStore';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { GroupType } from '@/lib/types';
import { Group } from '@/components/root/Group';

const GroupDialog = () => {
  const [groups, setGroups] = useState<GroupType[] | null>(null);
  const { mutateAsync: getAllGroups, isPending: isGetting } = useGetAllGroups();
  const { mutateAsync: generatePreSignedUrls } = useGenerateGroupPreSignedUrls();
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
    <>
      <div className="grid grid-cols-1 mx-auto mt-8 text-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isGetting ? (
          <>
            <Skeleton className="cursor-pointer flex rounded-lg bg-neutral-200 flex-col items-center justify-start border border-neutral-300">
              <AspectRatio ratio={3 / 1} className="w-full">
                <Skeleton className="h-full w-full object-cover rounded-t-lg border-neutral-100" />
              </AspectRatio>
              <Skeleton className="mx-2 px-3 py-2 mt-1 w-1/3 self-start my-3 h-6"></Skeleton>
              <Skeleton className="text-xs text-PATRON_TEXT_WHITE_SECONDARY/60 text-start p-2 ml-2 pb-4 w-11/12 h-10 self-start my-3"></Skeleton>
            </Skeleton>
            <Skeleton className="cursor-pointer flex rounded-lg bg-neutral-200 flex-col items-center justify-start border border-neutral-300">
              <AspectRatio ratio={3 / 1} className="w-full">
                <Skeleton className="h-full w-full object-cover rounded-t-lg border-neutral-100" />
              </AspectRatio>
              <Skeleton className="mx-2 px-3 py-2 mt-1 w-1/3 self-start my-3 h-6"></Skeleton>
              <Skeleton className="text-xs text-PATRON_TEXT_WHITE_SECONDARY/60 text-start p-2 ml-2 pb-4 w-11/12 h-10 self-start my-3"></Skeleton>
            </Skeleton>
            <Skeleton className="cursor-pointer flex rounded-lg bg-neutral-200 flex-col items-center justify-start border border-neutral-300">
              <AspectRatio ratio={3 / 1} className="w-full">
                <Skeleton className="h-full w-full object-cover rounded-t-lg border-neutral-100" />
              </AspectRatio>
              <Skeleton className="mx-2 px-3 py-2 mt-1 w-1/3 self-start my-3 h-6"></Skeleton>
              <Skeleton className="text-xs text-PATRON_TEXT_WHITE_SECONDARY/60 text-start p-2 ml-2 pb-4 w-11/12 h-10 self-start my-3"></Skeleton>
            </Skeleton>
            <Skeleton className="cursor-pointer flex rounded-lg bg-neutral-200 flex-col items-center justify-start border border-neutral-300">
              <AspectRatio ratio={3 / 1} className="w-full">
                <Skeleton className="h-full w-full object-cover rounded-t-lg border-neutral-100" />
              </AspectRatio>
              <Skeleton className="mx-2 px-3 py-2 mt-1 w-1/3 self-start my-3 h-6"></Skeleton>
              <Skeleton className="text-xs text-PATRON_TEXT_WHITE_SECONDARY/60 text-start p-2 ml-2 pb-4 w-11/12 h-10 self-start my-3"></Skeleton>
            </Skeleton>
            <Skeleton className="cursor-pointer flex rounded-lg bg-neutral-200 flex-col items-center justify-start border border-neutral-300">
              <AspectRatio ratio={3 / 1} className="w-full">
                <Skeleton className="h-full w-full object-cover rounded-t-lg border-neutral-100" />
              </AspectRatio>
              <Skeleton className="mx-2 px-3 py-2 mt-1 w-1/3 self-start my-3 h-6"></Skeleton>
              <Skeleton className="text-xs text-PATRON_TEXT_WHITE_SECONDARY/60 text-start p-2 ml-2 pb-4 w-11/12 h-10 self-start my-3"></Skeleton>
            </Skeleton>
          </>
        ) : (
          <>
            {groups?.map((item, index) => (
              <Group
                id={item.id}
                key={index}
                imgSrc={item.groupCoverImage}
                title={item.groupName}
                subtitle={
                  item.groupDescription.slice(0, item.groupDescription.length / 10) + '....'
                }
                description={item.groupDescription}
                link={`/group/${item.id}`}
                members={item.members.length}
                handleJoin={handleJoin}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default GroupDialog;
