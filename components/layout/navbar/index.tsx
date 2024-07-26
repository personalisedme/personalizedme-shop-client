import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';

import { getCollections, getMenu } from 'lib/shopify';
import { Suspense } from 'react';
import FilterList from '../search/filter';
import logo from './../../../public/PM_logo_bg.png';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';
import SiteTitle from './site-title';
const { SITE_NAME } = process.env;

async function CollectionList() {
  const collections = await getCollections();
  return <FilterList list={collections} title="Collections" />;
}

export default async function Navbar() {
  const menu = await getMenu('main-menu');

  return (
    <nav className="gap-54 sticky left-0 right-0 top-0 z-50 flex items-center justify-center bg-slate-200 py-2">
      <div className="flex w-full items-center">
        <div className="mx-2 w-1/4">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>
        <div className="mx-auto hidden w-1/2 md:flex">
          <Suspense>
            <SiteTitle src={logo} />
          </Suspense>
        </div>

        <div className="flex w-1/4">
          <div className="hidden w-4/5 md:flex">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
