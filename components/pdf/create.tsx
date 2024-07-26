'use client';

import PDFComponent from 'components/pdf/pdf-component';
import {
  PDFTemplateType,
  flipBookTemplates,
  memoryBookTemplates
} from 'lib/sitecontent/pdf-templates';
import Image from 'next/image';

import { useEffect, useState } from 'react';

function Create({ handle }: { handle: string }) {
  const [options, setOptions] = useState<PDFTemplateType[]>([
    {
      title: '',
      item: '',
      thumbnail: ''
    }
  ]);

  const [template, setTemplate] = useState<PDFTemplateType>({
    title: '',
    item: '',
    thumbnail: ''
  });

  useEffect(() => {
    switch (handle) {
      case 'memories-in-motion-engraving-your-personalized-memory-book':
        setOptions(memoryBookTemplates);
        break;
      case 'personalised-desk-fbook':
        setOptions(flipBookTemplates);
        break;
      default:
        break;
    }
  }, []);

  const handleGoBack = () => {
    if (template.title === '') {
    } else {
      setTemplate({
        title: '',
        item: '',
        thumbnail: ''
      });
    }
  };

  return (
    <div>
      {template.title === '' ? (
        <>
          <h1>Select Your Template</h1>
          <div className="flex gap-10 md:flex-row">
            {options.map((item, index) => {
              return (
                <button key={index} className="w-1/4 " onClick={() => setTemplate(item)}>
                  <TemplateOptionsElement item={item}></TemplateOptionsElement>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <h1>Customise Your Product</h1>
          <div className="mx-auto w-full">
            <PDFComponent document={template.item}></PDFComponent>
          </div>
        </>
      )}
      <div className="flex w-full">
        <button
          className="text-large mr-auto w-auto rounded-full bg-blue-600 px-4 py-2 text-white"
          onClick={() => {
            handleGoBack();
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Create;

function TemplateOptionsElement({ item }: { item: PDFTemplateType }) {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      <Image className="mx-auto" src={item.thumbnail} alt="" width={150} height={200}></Image>
      <p>{item.title}</p>
    </div>
  );
}
