'use client';
import { FormEvent, useState } from 'react';

export default function EmailSubscriptionForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    console.log(formData);
    setFormSubmitted(true);
  };

  return (
    <div className="mx-auto w-4/5 text-center text-white">
      <h2 className="my-5 text-2xl md:text-3xl">
        BE THE FIRST TO KNOW WHEN WE LAUNCH AND GET A 30% DISCOUNT
      </h2>
      {formSubmitted ? (
        <h3>Thank You!</h3>
      ) : (
        <form onSubmit={onSubmit}>
          <input
            className="mx-2 w-1/2 rounded-full border border-white bg-transparent px-8 py-4"
            type="email"
            name="email"
            placeholder="Enter your Email!"
          ></input>
          <button
            className="mx-2 w-1/4 rounded-full bg-purple-700 px-8 py-4 text-white hover:bg-white hover:text-black"
            type="submit"
          >
            Im In!
          </button>
        </form>
      )}
    </div>
  );
}
