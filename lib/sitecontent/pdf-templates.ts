export type PDFTemplateType = {
  title: string;
  toolbar: string;
  item: string;
  thumbnail: string;
};

export const memoryBookTemplates: PDFTemplateType[] = [
  {
    title: 'Memories For Dad',
    toolbar: 'book1toolbarOptions',
    item: 'https://cdn.shopify.com/s/files/1/0677/4741/4263/files/Engraving_Memories_Book_Father_1800_x_2700_px_2__compressed.docx?v=1723275974',
    thumbnail: 'https://cdn.shopify.com/s/files/1/0677/4741/4263/files/emb-for-dad.png?v=1718832103'
  },
  {
    title: 'Memories For Mom',
    toolbar: 'book1toolbarOptions',
    item: 'https://cdn.shopify.com/s/files/1/0677/4741/4263/files/Engraving_Memories_Book_Mother_1800_x_2700_px_2__compressed_1.docx?v=1723275977',
    thumbnail: 'https://cdn.shopify.com/s/files/1/0677/4741/4263/files/EMB-Mother.jpg?v=1718916112'
  },

  {
    title: 'document editable',
    toolbar: '',
    item: 'https://cdn.shopify.com/s/files/1/0677/4741/4263/files/Clip_Complete.docx?v=1720366630',
    thumbnail:
      'https://cdn.shopify.com/s/files/1/0677/4741/4263/files/mka101353_sum05_ring_bound_books_horiz-fa3432c13e3d41898955b480aa67d739_4f5b9558-f237-4bde-9c35-5ceb720c629f.jpg?v=1716228954'
  }
];

export const flipBookTemplates: PDFTemplateType[] = [
  {
    title: 'Scripture Flip Book',
    toolbar: 'book2toolbarOptions',
    item: 'https://cdn.shopify.com/s/files/1/0677/4741/4263/files/Clip_1_1_-_122_1_2_1.docx?v=1723275963',
    thumbnail:
      'https://cdn.shopify.com/s/files/1/0677/4741/4263/files/Scripture_Flipbook_Template_2.png?v=1719699994'
  }
];
