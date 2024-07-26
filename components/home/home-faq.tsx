'use client';

import { ArrowDownIcon } from '@heroicons/react/24/outline';
import { FAQ } from 'lib/sitecontent/home-content';
import { useState } from 'react';

export default function HomeFAQ({ FAQs }: { FAQs: FAQ[] }) {
  return (
    <div className="flex flex-col gap-5 py-5">
      <h2 className="place-self-center self-center text-2xl md:text-4xl">
        Frequently Asked Questions
      </h2>
      {FAQs.map((item) => (
        <FAQTab key={item.q} q={item.q} a={item.a}></FAQTab>
      ))}
    </div>
  );
}

function FAQTab({ q, a }: { q: string; a: string }) {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="mx-auto w-4/5 rounded-md border border-white bg-white">
      <div
        className="flex cursor-pointer justify-center"
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        <h3 className="w-4/5 p-4">{q}</h3>
        <ArrowDownIcon width={25}></ArrowDownIcon>
      </div>
      {clicked === false ? (
        <></>
      ) : (
        <div>
          <h4 className="mx-auto w-4/5 bg-slate-300 p-4">{a}</h4>
        </div>
      )}
    </div>
  );
}
