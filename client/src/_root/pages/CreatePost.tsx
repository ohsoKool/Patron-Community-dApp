import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useRef, useState } from 'react';
import NavBar from '@/components/shared/NavBar';

const CreatePost = () => {
  const postButtonRef = useRef<HTMLButtonElement>(null);
  const accordionTriggerRef = useRef<HTMLButtonElement>(null);
  const [accordionState, setAccordionState] = useState(false);

  const handlePostClick = () => {
    setAccordionState((prev) => !prev);
    accordionTriggerRef.current?.click();
  };

  return (
    <section className="w-full flex flex-col items-center">
      <NavBar showAddress />
      <div className="flex items-center justify-between w-full">
        <Input className="w-32" />
        <Button
          className="rounded-md w-24 bg-PATRON_GREEN hover:bg-PATRON_GREEN/60 text-black font-semibold"
          ref={postButtonRef}
          onClick={handlePostClick}
        >
          {accordionState ? 'Back' : 'Post'}
        </Button>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="w-full hidden" ref={accordionTriggerRef}>
            Post
          </AccordionTrigger>

          <AccordionContent className="w-screen bg-PATRON_DARK_GRAY my-6">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default CreatePost;
