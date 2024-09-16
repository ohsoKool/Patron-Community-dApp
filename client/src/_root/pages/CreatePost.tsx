import { Button } from '@/components/ui/button';

import { useState } from 'react';
import NavBar from '@/components/shared/NavBar';
import { Textarea } from '@/components/ui/textarea';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createPostSchema } from '@/lib/schema/schema';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useCreatePost, useDisplayImageOnPreview } from '@/lib/query/query';
import { MoonLoader } from 'react-spinners';
import useWalletStore from '@/lib/zustand/WalletStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CreatePost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const { mutateAsync: displayImageOnPreview, isPending } = useDisplayImageOnPreview();
  const { mutateAsync: createPost } = useCreatePost();
  const { walletAddress } = useWalletStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = async () => {
    if (file?.name && file?.type) {
      const responsePreUrl = await displayImageOnPreview(file);
      setPreviewImageUrl(responsePreUrl.data.data.url);
    }
  };

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      description: '',
      title: '',
    },
  });

  async function onSubmit(values: z.infer<typeof createPostSchema>) {
    if (file && walletAddress && slug) {
      const response = await createPost({
        postImage: file?.name,
        postTitle: values.title,
        postDescription: values.description,
        walletAddress: walletAddress.toString(),
        groupId: slug,
      });

      if (Number(response) === 200) {
        toast({
          title: 'Post created successfully',
        });
        form.reset();
        setPreviewImageUrl('');
        setFile(null);
        navigate(`/group/${slug}`);
      } else {
        toast({
          title: 'Failed to create post',
        });
      }
    }
  }

  return (
    <section className="w-full flex flex-col items-center">
      <NavBar showAddress />
      <div className="container flex flex-col items-start justify-between w-full my-10">
        <h1 className="text-2xl font-changa font-semibold">Create Post</h1>
        <DropdownMenuSeparator className="bg-PATRON_BORDER_COLOR w-full" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mt-7">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post's Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="description..." className="min-h-40" {...field} />
                  </FormControl>
                  <FormDescription>Share your ideas in the group</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center w-full">
              <div className="flex w-4/6 flex-col justify-start items-start  mt-3 gap-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Post's Title</FormLabel>
                      <FormControl>
                        <Input placeholder="title" className="" {...field} />
                      </FormControl>
                      <FormDescription>Share your ideas in the group</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Input onChange={handleChange} id="picture" type="file" className="w-5/6" />
                <Button
                  disabled={isPending}
                  onClick={handleSubmit}
                  type="button"
                  className="w-2/3 text-rose-400 flex justify-center items-center gap-2"
                >
                  {isPending && (
                    <>
                      <MoonLoader size={14} color="#fff" />
                    </>
                  )}
                  Upload Image
                </Button>
                <FormDescription>Upload something for visual showing</FormDescription>
                <div className="flex items-center gap-5">
                  <Button
                    type="submit"
                    className="mt-4 h-10 w-28 bg-PATRON_TEXT_WHITE_SECONDARY text-black"
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    className="mt-4 h-10 w-28 text-PATRON_GREEN bg-PATRON_LIGHT_GRAY"
                  >
                    Set Bounty
                  </Button>
                </div>
              </div>
              <img
                src={
                  previewImageUrl ||
                  'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'
                }
                alt="Photo by Drew Beamer"
                className="w-2/6 h-60 rounded-md object-cover"
              />
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default CreatePost;
