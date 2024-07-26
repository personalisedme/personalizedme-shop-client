// const { COMPANY_NAME, SITE_NAME } = process.env;

import { footerMenuContent } from 'lib/sitecontent/footer-content';
import EmailSubscriptionForm from './email-sub-form';
import FooterMenuContainer from './footer-menu-container';
import UpperFooter from './upper-footer';

export default function Footer() {
  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="bg-orange-500 py-20">
        <EmailSubscriptionForm></EmailSubscriptionForm>
      </div>
      <div className="bg-gray-950 py-20">
        <UpperFooter></UpperFooter>
      </div>
      <div className="flex justify-around p-10">
        {footerMenuContent.map((item, index) => (
          <div className="w-1/5" key={index}>
            <FooterMenuContainer item={item} />
          </div>
        ))}
        <div className="w-1/5">
          <h4 className="">About Us</h4>
          <p>
            We are Here to Personalise and Modernise your Memories by Engraving YOUR " DIY "Book.
            With Your Personal Touch and Feeling. While Saving You on Shipping Cost and Time.
          </p>
        </div>
        <form className="w-2/5"></form>
      </div>
    </footer>
  );
}
