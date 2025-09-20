import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import Link from 'next/link';

const TakeATour = () => {
  return (
    <div className="container mx-auto p-5 bg-primary rounded-lg my-10 md:my-20">
      <div className="grid grid-cols-1 md:grid-cols-3 justify-evenly items-center">
        <div className=" items-center">
          <h1 className="text-xl font-semibold text-white">
            Take Your Art On Tour!
          </h1>
          <p className="text-white py-5">
            Promote your guest spot locations and connect with clients <br />{' '}
            wherever you go.
          </p>
          <Link href="/sign-in">
            <div className="px-4 py-2 rounded-lg text-white bg-black">
              Add Your Tour Dates
            </div>
          </Link>
        </div>
        <div className=" flex items-center justify-center">
          <Image
            src={AllImages.logoOfset}
            alt="logo"
            height={200}
            width={200}
          />
        </div>
        <div className=" flex items-center justify-center">
          <Image src={AllImages.image9} alt="logo" height={300} width={300} />
        </div>
      </div>
    </div>
  );
};

export default TakeATour;
