import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

export default function SiteTitle({ src }: { src: string | StaticImageData }) {
  return (
    <Link href={'/'} className="w-full">
      <Image
        src={'/PM_logo_bg.png'}
        width={200}
        height={50}
        alt=""
        className="mx-auto rounded-md bg-white p-2"
      />
    </Link>
  );
}
