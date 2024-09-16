import { useEffect, useState } from 'react';
import { AspectRatio } from '../ui/aspect-ratio';
import { DropdownMenuSeparator } from '../ui/dropdown-menu';
import { useGeneratePostPreSignedUrls, useGetAllPostsInGroup } from '@/lib/query/query';
import { useParams } from 'react-router-dom';
import { PostType } from '@/lib/types';
import { convertDateToDDMMYYYY } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';

const PostGrid = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const { mutateAsync: getPostsInGroup, isPending: isGettingPosts } = useGetAllPostsInGroup();
  const { mutateAsync: generatePostPreSignedUrls } = useGeneratePostPreSignedUrls();
  useEffect(() => {
    if (slug) {
      getPostsInGroup(slug).then((response) => {
        generatePostPreSignedUrls(response).then((response) => {
          setPosts(response);
        });
        // setPosts(response);
      });
    }
  }, []);
  return (
    <ul className="container grid grid-cols-1 mx-auto mt-3 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 my-6 mb-10">
      {isGettingPosts && (
        <>
          <Skeleton className="cursor-pointer flex rounded-lg bg-PATRON_DARK_GRAY flex-col items-center justify-start border border-PATRON_BORDER_COLOR">
            <Skeleton className="flex items-center w-full justify-start gap-3 my-3 px-2" />
          </Skeleton>
        </>
      )}
      {posts?.map((each) => (
        <li
          key={each.postTitle}
          className={
            'cursor-pointer flex rounded-lg bg-neutral-100 dark:bg-PATRON_DARK_GRAY flex-col items-center justify-start border border-neutral-300 dark:border-PATRON_BORDER_COLOR'
          }
        >
          <div className="flex items-center w-full justify-start gap-3 my-3 px-2">
            <Avatar>
              <AvatarImage src={each.onwner.image} alt={each.onwner.name} />
              <AvatarFallback>{each.onwner.name}</AvatarFallback>
            </Avatar>
            <h1 className="text-md font-changa font-semibold text-neutral-500 dark:text-PATRON_TEXT_WHITE_PRIMARY">
              {each.onwner.name}
            </h1>
          </div>
          <AspectRatio ratio={16 / 9} className="w-full">
            <img
              src={
                each.postImage ||
                'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'
              }
              alt="hi"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
          <div className="flex items-center justify-between w-full px-3">
            <h2 className=" w-full text-start text-xl font-changa font-medium py-2 mt-1 text-neutral-600 dark:text-PATRON_TEXT_WHITE_PRIMARY">
              {each.postTitle}
            </h2>
          </div>
          <DropdownMenuSeparator className="bg-neutral-300 dark:bg-PATRON_BORDER_COLOR w-full h-[0.5px]" />
          <p className="w-full text-xs text-neutral-600 dark:text-PATRON_TEXT_WHITE_SECONDARY/60 text-start p-2">
            {each.postDescription}
          </p>
          <DropdownMenuSeparator className="bg-neutral-300 dark:bg-PATRON_BORDER_COLOR h-[0.5px]" />
          <div className="w-full flex items-center p-3">
            <p className="text-xs text-neutral-600 dark:text-PATRON_TEXT_WHITE_SECONDARY/60 text-start py-2 w-full">
              {'Posted on '}
              {(() => convertDateToDDMMYYYY(each.createdAt))()}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PostGrid;
