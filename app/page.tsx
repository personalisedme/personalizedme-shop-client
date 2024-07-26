import HomeBanner from 'components/home/home-banner';
import HomeFAQ from 'components/home/home-faq';
import HowItWorks from 'components/home/home-how-to';
import ProductDetailsGelling, { ProductDetailsTabs } from 'components/home/product-details';
import { homeFAQs, productTabs } from 'lib/sitecontent/home-content';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-14">
      <div className="bg-gray-300">
        <HomeBanner />
      </div>
      <div className="">
        <ProductDetailsGelling />
      </div>
      <div className="bg-gray-300">
        <ProductDetailsTabs tabs={productTabs} />
      </div>
      <div className="">
        <HowItWorks />
      </div>
      <div className="bg-gray-300">
        <HomeFAQ FAQs={homeFAQs}></HomeFAQ>
      </div>
    </div>
  );
}
