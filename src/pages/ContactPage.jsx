import { useState } from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPinIcon,
      label: "Address",
      value: "123 Commerce Street, Suite 100",
      sub: "New York, NY 10001",
    },
    {
      icon: PhoneIcon,
      label: "Phone",
      value: "+1 (555) 123-4567",
      sub: "Mon–Fri 9am–6pm",
    },
    {
      icon: EnvelopeIcon,
      label: "Email",
      value: "hello@example.com",
      sub: "We reply within 24 hours",
    },
    {
      icon: ClockIcon,
      label: "Hours",
      value: "Mon – Fri: 9am – 6pm",
      sub: "Sat: 10am – 4pm",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="bg-stone-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-100">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-stone-300">
              Have a question or feedback? Send us a message and we’ll get back to you soon.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Contact info cards */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-lg font-semibold text-stone-900">Get in touch</h2>
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex gap-4 p-4 rounded-xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-stone-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-500">{item.label}</p>
                    <p className="mt-0.5 text-stone-900 font-medium">{item.value}</p>
                    {item.sub && (
                      <p className="mt-0.5 text-sm text-stone-500">{item.sub}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="px-6 py-5 sm:px-8 border-b border-stone-100">
                <h2 className="text-xl font-semibold text-stone-900">Send a message</h2>
                <p className="mt-1 text-sm text-stone-500">
                  Fill out the form below and we’ll respond as soon as we can.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                {submitted && (
                  <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
                    Thanks! Your message has been sent. We’ll get back to you soon.
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-900 shadow-sm focus:border-stone-500 focus:ring-1 focus:ring-stone-500 sm:text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-900 shadow-sm focus:border-stone-500 focus:ring-1 focus:ring-stone-500 sm:text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-stone-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-900 shadow-sm focus:border-stone-500 focus:ring-1 focus:ring-stone-500 sm:text-sm"
                    placeholder="What is this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-900 shadow-sm focus:border-stone-500 focus:ring-1 focus:ring-stone-500 sm:text-sm"
                    placeholder="Your message..."
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-stone-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-stone-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                  >
                    Send message
                    <PaperAirplaneIcon className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
