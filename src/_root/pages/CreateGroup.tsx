import NavBar from '@/_public/components/NavBar';
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
import { MagicCard } from '@/components/magicui/magic-card';
import { useNavigate } from 'react-router-dom';

const CreateGroup = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof createGroupSchema>>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      groupName: '',
      groupDescription: '',
    },
  });

  function onSubmit(values: z.infer<typeof createGroupSchema>) {
    console.log(values);
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
        <div className="w-full hidden lg:flex flex-col justify-center items-center py-5">
          <h1 className="text-xl w-full pb-3 px-10 sm:text-center font-audio-wide border-b border-b-PATRON_BORDER_COLOR">
            Preview
          </h1>
          <div className="flex w-full flex-col items-center py-16">
            <MagicCard
              className="cursor-pointer rounded-t-lg bg-PATRON_DARK_GRAY flex-col items-center justify-center  border-PATRON_BORDER_COLOR w-3/5 shadow-2xl shadow-[#84dcff29]"
              gradientColor={'#1C1C1C'}
            >
              <img
                src="https://res.cloudinary.com/dg946flpg/image/upload/v1721592039/rroaidasasdffromdhdk.png"
                alt="Display"
                className="object-cover"
              />
              <div className="flex justify-between items-center px-5 py-2">
                <h1 className="text-xl text-PATRON_TEXT_WHITE_PRIMARY my-2">THIS IS TITLE</h1>
                <Button className="h-7 text-xs text-rose-400">Join</Button>
              </div>
            </MagicCard>
            <MagicCard
              className="cursor-pointer rounded-b-lg bg-PATRON_LIGHT_GRAY flex-col items-center justify-center border-PATRON_BORDER_COLOR w-3/5"
              gradientColor={'#1C1C1C'}
            >
              <p className="text-xs py-5 px-3 text-PATRON_TEXT_WHITE_SECONDARY">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam odio consectetur
                culpa corrupti est debitis minus possimus laboriosam maxime sed?
              </p>
            </MagicCard>
          </div>
        </div>

        <div className="w-full border-l border-l-PATRON_BORDER_COLOR flex flex-col justify-start items-start py-5">
          <h1 className="text-xl  w-full pb-3 px-10 sm:text-center font-audio-wide border-b border-b-PATRON_BORDER_COLOR">
            Create your own community
          </h1>
          <div className="w-full items-center gap-1.5 mt-12 px-10 md:px-20">
            <Label htmlFor="picture" className="">
              Your community's coverpage
            </Label>
            <Input id="picture" type="file" className="mt-3" />
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
                    <FormLabel>Your Community's Story</FormLabel>
                    <FormControl>
                      <Input placeholder="Share your passion!" {...field} />
                    </FormControl>
                    <FormDescription className="text-neutral-600">
                      Describe your community's purpose and what makes it special.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-start items-center gap-4 ">
                <Button type="submit" className="text-purple-500">
                  Create Your Community
                </Button>
                <Button
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
