import NavBar from '@/components/shared/NavBar';
import { createGroupSchema } from '@/lib/schema/schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import PreviewCard from '../../components/root/PreviewCard';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useCreateGroup, useDisplayImageOnPreview } from '@/lib/query/query';
import { MoonLoader } from 'react-spinners';
import useWalletStore from '@/lib/zustand/WalletStore';
import { useToast } from '@/hooks/use-toast';

const CreateGroup = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const { mutateAsync: displayImageOnPreview, isPending } = useDisplayImageOnPreview();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };
  const handleSubmit = async () => {
    if (file?.name && file?.type) {
      const responsePreUrl = await displayImageOnPreview(file);
      setPreviewImageUrl(responsePreUrl.data.data.url);
    }
  };

  const navigate = useNavigate();
  const form = useForm<z.infer<typeof createGroupSchema>>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      groupName: '',
      groupDescription: '',
    },
  });

  const { mutateAsync: createGroup, isPending: isCreating } = useCreateGroup();

  const { walletAddress } = useWalletStore();

  async function onSubmit(values: z.infer<typeof createGroupSchema>) {
    const coverImage = file?.name;

    const response = await createGroup({
      groupName: values.groupName,
      groupDescription: values.groupDescription,
      groupCoverImage: coverImage || '',
      walletAddress: walletAddress?.toString() || '',
    });

    if (response?.status === 200) {
      navigate('/all-groups');

      toast({
        title: 'Group created successfully',
      });
    } else {
      toast({
        title: 'Failed to create group',
      });
    }
  }
  return (
    <section className="w-full">
      <NavBar showAddress />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 fade-in-gradient -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative aspect-[1155/678] w-[36.125rem]  bg-gradient-to-tr from-[#9011ffd8] to-[#e9ff1f4d]  sm:w-[72.1875rem] opacity-20 custom-fade-in"
        />
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-center items-start">
        <PreviewCard imageUrl={previewImageUrl} isPending={isPending} />

        <div className="w-full order-5 h-full dark:border-l lg:dark:border-t-black dark:border-l-PATRON_BORDER_COLOR flex flex-col justify-start items-start py-5">
          <h1 className="text-xl  w-full pb-3 px-10 sm:text-center font-audio-wide border-b dark:border-b-PATRON_BORDER_COLOR">
            Create your own channel
          </h1>
          <div className="w-full items-center gap-1.5 mt-12 px-10 md:px-20">
            <Label htmlFor="picture" className="">
              Your channel's coverpage
            </Label>
            <div className="flex items-center  mt-3 gap-3">
              <Input onChange={handleChange} id="picture" type="file" className="w-2/3" />
              <Button
                variant={'patron'}
                onClick={handleSubmit}
                className="w-1/3 text-rose-400 bg-neutral-300 flex justify-center items-center"
              >
                {isPending ? (
                  <>
                    <MoonLoader size={14} color="#fff" />
                  </>
                ) : (
                  <>
                    <h1>Upload</h1>
                  </>
                )}
              </Button>
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 px-10 my-10 md:px-20 w-full md:pb-10"
            >
              <FormField
                control={form.control}
                name="groupName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Community's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Unleash your creativity!" {...field} />
                    </FormControl>
                    <FormDescription className="text-neutral-600">
                      Craft a captivating name that reflects your group's essence.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="groupDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your channel's Story</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Share your passion!" {...field} />
                    </FormControl>
                    <FormDescription className="text-neutral-600">
                      Describe your channel's purpose and what makes it special.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-start items-center gap-4 ">
                <Button variant={'patron'} type="submit" className="text-purple-500">
                  {isCreating ? <MoonLoader size={14} color="#fff" /> : 'Create Your Community'}
                </Button>
                <Button
                  variant={'patron'}
                  onClick={() => navigate('/all-groups')}
                  type="button"
                  className="text-yellow-400 w-20"
                >
                  Back
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default CreateGroup;
