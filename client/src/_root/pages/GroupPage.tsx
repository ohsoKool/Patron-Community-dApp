import NavBar from '@/components/shared/NavBar';
import { Button } from '@/components/ui/button';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
// import { generatePreSignedUrls } from '@/lib/api';
import { useGetGroupById, useGetUserJoinedDate } from '@/lib/query/query';
import { GroupType } from '@/lib/types';
import { convertDateToDDMMYYYY } from '@/lib/utils';
import useWalletStore from '@/lib/zustand/WalletStore';
import { CalendarDays, UserPlus, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const GroupPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [group, setGroup] = useState<GroupType | null>(null);
  const [joinedDate, setjoinedDate] = useState<string | null>(null);
  const { walletAddress } = useWalletStore();

  const { mutateAsync: getGroupById } = useGetGroupById();
  const { mutateAsync: getUserJoinedDate } = useGetUserJoinedDate();

  useEffect(() => {
    if (slug) {
      getGroupById(slug).then((response) => {
        // generatePreSignedUrls(response).then((response) => {
        //   setGroup(response);
        // });
        setGroup(response);
      });

      if (walletAddress) {
        getUserJoinedDate({
          walletAddress: walletAddress.toString(),
          groupId: slug,
        }).then((response) => {
          setjoinedDate(convertDateToDDMMYYYY(response));
        });
      }
    }
  }, []);
  return (
    <section className="w-full h-full flex flex-col">
      <NavBar showAddress />
      <div className="container flex flex-col my-5 mt-8 gap-5">
        <div className="w-full h-24 sm:h-32 lg:h-40 mx-auto">
          <img
            src={
              // group?.groupCoverImage ||
              'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'
            }
            alt="Photo by Drew Beamer"
            className="h-full w-full rounded-md object-cover"
          />
        </div>
        <div className="w-full flex flex-col justify-start">
          <h1 className="text-xl md:text-2xl font-bold font-changa text-PATRON_TEXT_WHITE_PRIMARY">
            {group?.groupName?.toUpperCase()}
          </h1>
          <p className="text-xs text-PATRON_TEXT_WHITE_SECONDARY/50 my-2">
            {group?.groupDescription}
          </p>
          <div className="flex items-center gap-3 w-full justify-between pr-10 my-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <CalendarDays size={15} />
                <span className="mx-2 text-sm text-PATRON_TEXT_WHITE_SECONDARY">
                  {group?.createdAt && (() => convertDateToDDMMYYYY(group?.createdAt))()}
                </span>
              </div>
              <div className="flex items-center">
                <Users size={15} />
                <span className="mx-2 text-sm text-PATRON_TEXT_WHITE_SECONDARY">
                  {group?.members?.length || 0}
                  {group?.members?.length! > 1 ? ' members' : ' member'}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <UserPlus size={15} />
              <span className="mx-2 text-sm text-PATRON_TEXT_WHITE_SECONDARY">
                {'Joined this community on ' + joinedDate}
              </span>
            </div>
          </div>
        </div>
      </div>
      <DropdownMenuSeparator className="bg-PATRON_BORDER_COLOR" />
      <div className="container flex flex-col items-center my-6">
        <div className="flex items-center justify-between w-full">
          <Input className="w-32" />
          <Button
            onClick={() => {
              navigate('/create-post');
            }}
            className="rounded-md w-24 bg-PATRON_GREEN hover:bg-PATRON_GREEN/60 text-black font-semibold"
          >
            Post
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GroupPage;
