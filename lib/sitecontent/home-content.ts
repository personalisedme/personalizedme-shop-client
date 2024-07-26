type HomeBanner = {
  title: string;
  content: string;
  videoLink: string;
  videoType: string;
};

export const homeBannerContent: HomeBanner = {
  title: 'Introducing Our Latest Innovation,',
  content:
    'crafted with precision to fulfill your deepest desires for personalized gifting and cherished memories. Our product embodies the essence of convenience, creativity, and heartfelt expression.',
  videoLink: 'https://cdn.shopify.com/videos/c/o/v/69678ed4d83f4e4dbd05803baa4a587e.mp4',
  videoType: 'video/mp4'
};

type HomeProductDetailImages = {
  title: string;
  imgSrc: string;
};

type HomeProductDetailText = {
  strong: string;
  text: string;
};

export const homeProductDetails: HomeProductDetailImages[] = [
  {
    title: 'Career',
    imgSrc:
      'https://cdn.shopify.com/s/files/1/0677/4741/4263/files/0106_msl_memories04_vert-2000-0eadb54273e94f50988feab63294f249-2_1ddaad24-f836-4517-89b0-ae9702c3915c.jpg?v=1716228955'
  },
  {
    title: "Baby's Journey",
    imgSrc:
      'https://cdn.shopify.com/s/files/1/0677/4741/4263/files/ka101967_sp06_memorybx_xl-567b8041abf947be816e29a0dd8d276a-2_3ad1f406-a1e6-42a9-a246-ada0072ada6d.jpg?v=1716228954'
  },
  {
    title: 'Road Trip',
    imgSrc:
      'https://cdn.shopify.com/s/files/1/0677/4741/4263/files/square-road-trip.jpg?v=1718438670'
  },
  {
    title: 'Memories with Family',
    imgSrc:
      'https://cdn.shopify.com/s/files/1/0677/4741/4263/files/tvs8549_xl-65007ffe76e8449296c65020b7a88610-2_1156580f-55c6-4e79-9562-530264ef2415.jpg?v=1716228955'
  }
];

export const productDetailsText: HomeProductDetailText[] = [
  {
    strong: 'Are you tired of endlessly searching',
    text: 'for the perfect gift, or struggling to immortalize your most cherished moments? Look no further.'
  },
  {
    strong: 'We are thrilled to present a solution',
    text: 'that revolutionizes the way you preserve memories and express yourself.'
  },
  {
    strong: 'Our carefully curated product empowers',
    text: 'you to effortlessly upload your pictures and craft personalized quotes, capturing the essence of every moment.'
  },
  {
    strong: 'This timeless do-it-yourself book is tailor-made',
    text: 'for individuals who understand the value of creating and preserving memories for generations to come.'
  },
  {
    strong: 'It serves as your ultimate companion',
    text: 'for every occasion, offering a unique and heartfelt gift-giving experience that transcends ordinary offerings'
  }
];

export type pdTab = {
  title: string;
  content: string;
  itype: string;
  image: string;
  imageAlt: string;
};
export const productTabs: pdTab[] = [
  {
    title: '100% Personalisable',
    content:
      "From uploading Pictures to caption the experience (Text Colour , Font and Size) and language of their Heart , unleash your creativity without any limitations. You don't need to be a graphic designer or hire one; our intuitive platform makes customisation a breeze .",
    itype: 'image',
    image: 'https://cdn.shopify.com/s/files/1/0677/4741/4263/files/2.jpg?v=1716067987',
    imageAlt: 'quick show of how personalisation works'
  },
  {
    title: 'Ideal Gift for All Occasions and Peoples',
    content:
      "Whether it's birthdays, weddings, anniversaries, or simply expressing gratitude, our product is the quintessential gift for every milestone and momentous occasion",
    itype: 'image',
    image: 'https://cdn.shopify.com/s/files/1/0677/4741/4263/files/emb-for-dad.png?v=1718832103',
    imageAlt: 'short video'
  },
  {
    title: 'Shareable Digitally',
    content:
      'Say goodbye to shipping costs and hello to convenience. With the ability to share digitally, you have full control over the printing quality and choice of paper at your local printer, saving you time and money.',
    itype: 'image',
    image: 'https://cdn.shopify.com/s/files/1/0677/4741/4263/files/3.jpg?v=1716067987',
    imageAlt: 'digitally sharable'
  }
];

export type HowToElementType = {
  imageURL: string;
  title: string;
};

export const HowToElements: HowToElementType[] = [
  {
    imageURL:
      'https://cdn.shopify.com/s/files/1/0677/4741/4263/files/1_fdb80e68-8221-4003-a814-3a09d1a8f27e.png?v=1710617285',
    title: 'Select Your Product'
  },
  {
    imageURL: 'https://cdn.shopify.com/s/files/1/0677/4741/4263/files/2.jpg?v=1716067987',
    title: 'Customise Your Product'
  },
  {
    imageURL: 'https://cdn.shopify.com/s/files/1/0677/4741/4263/files/3.jpg?v=1716067987',
    title: 'Order Your Product '
  }
];

export type FAQ = {
  q: string;
  a: string;
};

export const homeFAQs: FAQ[] = [
  {
    q: 'Refund Policy',
    a: 'All Sales Are Final. Please carefully review your order before confirming your purchase. All sales are considered final. Due to the nature of our business (personalisation), we Do not offer refunds or exchanges for any products.'
  },
  {
    q: 'Do I Need Special Software Or Hardware To Personalise My Gift?',
    a: 'All you need is your PC, laptop . For downloading, we will provide you with a link to download your gift.'
  },
  {
    q: 'Can I Download The Personalised Gift On To My Hand Held Device?',
    a: 'Yes. It is meant to be Self- Print . This is to give you control over the Paper quality and personalised details.'
  },
  {
    q: 'How Do I Get Help If I Have A Problem?',
    a: 'Email us.'
  },
  {
    q: 'Do I Pay Extra For Adding Pages?',
    a: 'NO. You can have as many pages as you want.'
  }
];
