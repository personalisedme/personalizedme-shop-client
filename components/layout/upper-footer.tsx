import { LockClosedIcon, PaperAirplaneIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { UpperFooterElementType, UpperFooterElements } from 'lib/sitecontent/footer-content';

export default function UpperFooter() {
  return (
    <div className="flex justify-around">
      {UpperFooterElements.map((items) => (
        <div key={items.name}>
          <UpperFooterElement items={items}></UpperFooterElement>
        </div>
      ))}
    </div>
  );
}

function UpperFooterElement({ items }: { items: UpperFooterElementType }) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <DisplayIcon icon={items.icon}></DisplayIcon>
      <h4 className="my-5 font-bold">{items.name}</h4>
      <p>{items.text}</p>
    </div>
  );
}

function DisplayIcon({ icon }: { icon: string }) {
  if (icon === 'plane') {
    return <PaperAirplaneIcon rotate={35} width={25}></PaperAirplaneIcon>;
  } else if (icon === 'phone') {
    return <PhoneIcon width={25}></PhoneIcon>;
  } else if (icon === 'lock') {
    return <LockClosedIcon width={25}></LockClosedIcon>;
  }
  return <></>;
}
