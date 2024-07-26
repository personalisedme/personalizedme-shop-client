import { AddToCart } from 'components/cart/add-to-cart';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { Suspense } from 'react';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="pointer-events-none mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="flex justify-start">
          <div className="text-large w-[200px] rounded-full bg-blue-600 px-4 py-2 text-white">
            <AddToCart
              variants={product.variants}
              availableForSale={product.availableForSale}
            ></AddToCart>
          </div>
        </div>
      </div>
      <Suspense fallback={null}>
        <VariantSelector options={product.options} variants={product.variants} />
      </Suspense>

      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}
    </>
  );
}
