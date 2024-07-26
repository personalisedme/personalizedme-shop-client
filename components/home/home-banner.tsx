import { homeBannerContent } from 'lib/sitecontent/home-content';
import Link from 'next/link';

export default function HomeBanner() {
  return (
    <div className="mx-auto flex md:flex-row">
      <div className="z-20 flex w-2/3 flex-col gap-10  md:py-40">
        <div className="mx-auto w-full p-2 md:w-4/5">
          <h1 className="text-xl md:text-2xl">{homeBannerContent.title}</h1>
          <p className="my-5 pt-5 text-lg backdrop-blur-sm md:text-xl">
            {homeBannerContent.content}
          </p>
        </div>
        <div className="mx-auto w-full p-2 md:w-4/5 ">
          <Link
            className="rounded-full  bg-purple-700 px-8 py-4 text-lg text-white hover:bg-orange-500 hover:text-black md:text-xl lg:text-2xl"
            href={'/search'}
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div className="my-5">
        <video
          className="home-video absolute left-1/3 aspect-4/5 w-1/3"
          controls
          preload="auto"
          autoPlay
          loop
          muted
        >
          <source src={homeBannerContent.videoLink} type={homeBannerContent.videoType} />
          <track src="/path/to/captions.vtt" kind="subtitles" srcLang="en" label="English" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
