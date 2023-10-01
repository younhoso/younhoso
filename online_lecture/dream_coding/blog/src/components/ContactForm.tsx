'use client';
import { ChangeEvent, FormEvent, useState } from "react";

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
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setForm(prev => ({...prev, [name]: value}));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form)
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="from">Your Email</label>
        <input type="email" id="from" name="from" value={form.from} onChange={onChange} required autoFocus />

        <label htmlFor="subject">Subject</label>
        <input type="text" id="subject" name="subject" value={form.subject} onChange={onChange} required />

        <label htmlFor="message">Message</label>
        <textarea rows={10} id="message" name="message" value={form.message} onChange={onChange} required />

        <button>Submit</button>
      </form>
    </>
  );
} 