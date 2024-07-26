import { getMenu } from 'lib/shopify';
import { FooterMenuType } from 'lib/sitecontent/footer-content';
import FooterMenu from './footer-menu';

async function FooterMenuContainer({ item }: { item: FooterMenuType }) {
  const menu = await getMenu(item.handle);

  return (
    <div className="mx-2">
      <h4>{item.content}</h4>
      <FooterMenu menu={menu}></FooterMenu>
    </div>
  );
}

export default FooterMenuContainer;
