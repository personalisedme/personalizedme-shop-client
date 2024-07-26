export type FooterMenuType = {
  content: string;
  handle: string;
};

export const footerMenuContent: FooterMenuType[] = [
  {
    content: 'CUSTOMER CARE',
    handle: 'new-customer-care'
  },
  {
    content: 'POLICIES',
    handle: 'policies'
  }
];

export type UpperFooterElementType = {
  name: string;
  text: string;
  icon: string;
};

export const UpperFooterElements: UpperFooterElementType[] = [
  {
    name: 'Email',
    text: 'sent to email for self print',
    icon: 'plane'
  },
  {
    name: 'Customer service',
    text: '24/7 customer support available',
    icon: 'phone'
  },
  {
    name: 'Secure payment',
    text: 'As for mentioning secure payment',
    icon: 'lock'
  }
];
