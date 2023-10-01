'use client';
import { ChangeEvent, FormEvent, useState } from "react";
import Banner, { BannerData } from "./Banner";

type Form = {
  from: string;
  subject: string;
  message: string;
};

const baseInfoData = {
  from: '',
  subject: '',
  message: '',
}

export default function ContactForm() {
  const [form, setForm] = useState<Form>(baseInfoData);
  const [banner, setBanner] = useState<BannerData | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setForm(prev => ({...prev, [name]: value}));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form)
    
    setBanner({message: '성공했어!!', state: 'error'});
    // setTimeout(() => {
    //   setBanner(null);
    // }, 3000);
  };

  return (
    <section className="w-full max-w-md">
      {banner && <Banner banner={banner} />}
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-2 my-4 p-4 bg-slate-700 rounded-xl text-white">
        <label htmlFor="from" className="font-semibold">Your Email</label>
        <input className="text-black" type="email" id="from" name="from" value={form.from} onChange={onChange} required autoFocus />

        <label htmlFor="subject" className="font-semibold" >Subject</label>
        <input className="text-black" type="text" id="subject" name="subject" value={form.subject} onChange={onChange} required />

        <label htmlFor="message" className="font-semibold">Message</label>
        <textarea className="text-black" rows={10} id="message" name="message" value={form.message} onChange={onChange} required />

        <button className="bg-yellow-300 text-black font-bold hover:bg-yellow-400">Submit</button>
      </form>
    </section>
  );
} 