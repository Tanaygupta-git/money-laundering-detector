import React, { useState } from "react";
import { sendContact } from "../api";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  React.useEffect(() => {
    setCaptcha(Math.random().toString(36).substring(2, 8));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (captchaInput !== captcha) {
      setStatus("CAPTCHA incorrect.");
      return;
    }
    try {
      await sendContact(form);
      setStatus("Message sent.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("Failed to send message.");
    }
  }

  return (
    <div className="container">
      <h2>Contact Admin</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Your email" value={form.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Your message" value={form.message} onChange={handleChange} required />
        <div>
          <label>CAPTCHA: {captcha}</label>
          <input value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} required />
        </div>
        <button type="submit">Send</button>
      </form>
      {status && <div>{status}</div>}
    </div>
  );
};
export default ContactPage;