import { AspectRatio } from '@radix-ui/react-aspect-ratio';

const Display = () => {
  return (
    <>
      <div className=" w-2/3 mx-auto relative top-12 p-1 sm:p-3  rounded-md bg-PATRON_LIGHT_GRAY border border-PATRON_BORDER_COLOR">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <img
            src="https://res.cloudinary.com/dg946flpg/image/upload/v1721592039/rroaidasasdffromdhdk.png"
            alt="Display"
            className="object-cover"
          />
        </AspectRatio>
      </div>
    </>
  );
};

export default Display;
