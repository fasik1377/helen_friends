"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Scissors,
  Send,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useState } from "react";

const products = [
  {
    name: "Brazilian Human Hair",
    price: "From $85",
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200&auto=format&fit=crop",
    note: "Soft bundles, natural shine, salon matched.",
  },
  {
    name: "Nourishing Hair Oil",
    price: "From $18",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop",
    note: "For growth, scalp care, and everyday gloss.",
  },
  {
    name: "Lace Front Wigs",
    price: "From $120",
    image:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1200&auto=format&fit=crop",
    note: "Custom fitting, styling, and care advice.",
  },
];

const gallery = [
  {
    title: "Color Refresh",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Bridal Makeup",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Silk Press",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Nail Care",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Spa Glow",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Men's Grooming",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop",
  },
];

const prices = [
  ["Haircut & Styling", "$25"],
  ["Wash, Treatment & Blow Dry", "$35"],
  ["Braids & Protective Styles", "$45"],
  ["Human Hair Installation", "$70"],
  ["Facial Glow Treatment", "$40"],
  ["Makeup Session", "$55"],
  ["Manicure & Pedicure", "$30"],
  ["Full Spa Massage", "$60"],
];

const chatReplies = [
  "Hi, welcome to Helen Friends. We can help with booking, services, and product advice.",
  "For human hair, wigs, and oils, our stylist can recommend what fits your hair goal.",
  "Appointments are available this week. Tell us the service and preferred time.",
];

export default function Home() {
  const [activeProduct, setActiveProduct] = useState(0);
  const [chatOpen, setChatOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    {
      from: "salon",
      text: "Hello, I am Helen Friends assistant. How can we make you glow today?",
    },
  ]);
  const [message, setMessage] = useState("");

  const nextProduct = () =>
    setActiveProduct((current) => (current + 1) % products.length);

  const previousProduct = () =>
    setActiveProduct(
      (current) => (current - 1 + products.length) % products.length,
    );

  const sendMessage = () => {
    if (!message.trim()) return;

    const reply =
      chatReplies[Math.floor(Math.random() * chatReplies.length)];

    setChatMessages((current) => [
      ...current,
      { from: "guest", text: message.trim() },
      { from: "salon", text: reply },
    ]);
    setMessage("");
  };

  return (
    <main className="bg-black text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pb-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop"
            alt="Helen Friends beauty salon"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        <div className="relative z-10 max-w-7xl px-6 lg:px-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="uppercase tracking-[6px] text-yellow-400 mb-4 text-sm"
          >
            Helen Friends Beauty Salon
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-tight max-w-4xl mx-auto"
          >
            Beauty, Style & Confidence
            <span className="block text-yellow-400">For Men & Women</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-8"
          >
            Experience premium beauty care, modern styling, skincare, hair
            treatment, makeup, grooming, and wellness services designed for
            everyone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all duration-300">
              Book Appointment
              <ArrowRight size={20} />
            </button>

            <button className="border border-white/30 hover:bg-white hover:text-black px-8 py-4 rounded-full font-semibold transition-all duration-300">
              Explore Services
            </button>
          </motion.div>
        </div>
      </section>

      <section className="bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 grid lg:grid-cols-[320px_1fr] gap-10 items-start">
          <aside className="lg:sticky lg:top-8">
            <div className="border border-yellow-500/40 bg-zinc-900 rounded-[28px] overflow-hidden shadow-2xl shadow-yellow-500/10">
              <div className="relative h-64">
                <Image
                  src={products[activeProduct].image}
                  alt={products[activeProduct].name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                <div className="absolute left-5 right-5 bottom-5">
                  <p className="text-xs uppercase tracking-[4px] text-yellow-300">
                    Product Offer
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">
                    {products[activeProduct].name}
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-yellow-400 text-2xl font-bold">
                    {products[activeProduct].price}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={previousProduct}
                      className="h-10 w-10 rounded-full bg-white/10 hover:bg-yellow-500 hover:text-black grid place-items-center transition"
                      aria-label="Previous product"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextProduct}
                      className="h-10 w-10 rounded-full bg-white/10 hover:bg-yellow-500 hover:text-black grid place-items-center transition"
                      aria-label="Next product"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
                <p className="mt-4 text-zinc-300 leading-7">
                  {products[activeProduct].note}
                </p>
                <button className="mt-6 w-full bg-yellow-500 hover:bg-yellow-400 text-black rounded-full py-3 font-semibold transition">
                  Ask About Product
                </button>
                <div className="mt-5 flex gap-2">
                  {products.map((product, index) => (
                    <button
                      key={product.name}
                      onClick={() => setActiveProduct(index)}
                      aria-label={`Show ${product.name}`}
                      className={`h-2 flex-1 rounded-full transition ${
                        index === activeProduct ? "bg-yellow-400" : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-24">
            {/* SERVICES SECTION */}
            <section>
              <div className="text-center mb-16">
                <p className="text-yellow-400 uppercase tracking-[5px] text-sm mb-3">
                  Our Services
                </p>

                <h2 className="text-4xl md:text-5xl font-bold">
                  Premium Salon Experience
                </h2>

                <p className="mt-5 text-zinc-400 max-w-2xl mx-auto text-lg">
                  We provide world-class beauty and grooming services for both
                  men and women using modern techniques and premium products.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-yellow-500 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6">
                    <Scissors className="text-yellow-400" size={32} />
                  </div>

                  <h3 className="text-2xl font-semibold mb-4">Hair Styling</h3>

                  <p className="text-zinc-400 leading-7">
                    Professional haircut, coloring, treatment, and styling
                    services tailored for men and women.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-yellow-500 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6">
                    <Sparkles className="text-yellow-400" size={32} />
                  </div>

                  <h3 className="text-2xl font-semibold mb-4">
                    Skin & Makeup
                  </h3>

                  <p className="text-zinc-400 leading-7">
                    Facial treatment, skincare therapy, bridal makeup, and
                    luxury beauty enhancement services.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-yellow-500 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6">
                    <HeartHandshake className="text-yellow-400" size={32} />
                  </div>

                  <h3 className="text-2xl font-semibold mb-4">
                    Wellness & Spa
                  </h3>

                  <p className="text-zinc-400 leading-7">
                    Relaxing massage, spa therapy, grooming, and wellness
                    services for total rejuvenation.
                  </p>
                </motion.div>
              </div>
            </section>

            <section>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
                <div>
                  <p className="text-yellow-400 uppercase tracking-[5px] text-sm mb-3">
                    Gallery
                  </p>
                  <h2 className="text-4xl md:text-5xl font-bold">
                    Recent Beauty Moments
                  </h2>
                </div>
                <p className="text-zinc-400 max-w-md leading-7">
                  A look at signature hair, makeup, spa, nails, and grooming
                  work from Helen Friends.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {gallery.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.04 }}
                    className="relative h-72 rounded-3xl overflow-hidden group"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute left-5 right-5 bottom-5 flex items-center justify-between">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <Star className="text-yellow-400 fill-yellow-400" size={18} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section>
              <div className="bg-black border border-zinc-800 rounded-[32px] p-6 md:p-10">
                <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
                  <div>
                    <p className="text-yellow-400 uppercase tracking-[5px] text-sm mb-3">
                      Price List
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold">
                      Clear Beauty Pricing
                    </h2>
                    <p className="mt-5 text-zinc-400 leading-7">
                      Choose a single service or combine treatments for a full
                      refresh. Final price can vary by hair length and style
                      detail.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-300">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2">
                        <Clock size={16} className="text-yellow-400" />
                        Same day slots
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2">
                        <CalendarCheck size={16} className="text-yellow-400" />
                        Walk-ins welcome
                      </span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {prices.map(([service, price]) => (
                      <div
                        key={service}
                        className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 hover:border-yellow-500/70 transition"
                      >
                        <p className="text-zinc-300">{service}</p>
                        <p className="mt-3 text-2xl font-bold text-yellow-400">
                          {price}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative h-[500px] rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1974&auto=format&fit=crop"
              alt="Salon interior"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="uppercase tracking-[5px] text-yellow-400 mb-4 text-sm">
              About Us
            </p>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Modern Luxury Beauty Salon Experience
            </h2>

            <p className="mt-6 text-zinc-400 leading-8 text-lg">
              We combine creativity, elegance, and modern beauty techniques to
              deliver a premium salon experience for every client. Our expert
              stylists and beauty specialists are dedicated to helping you look
              and feel your best.
            </p>

            <div className="mt-10 flex gap-10">
              <div>
                <h3 className="text-4xl font-bold text-yellow-400">10+</h3>
                <p className="text-zinc-400 mt-2">Years Experience</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-yellow-400">5K+</h3>
                <p className="text-zinc-400 mt-2">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-yellow-500 text-black">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Ready For Your New Look?
          </h2>

          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-8">
            Book your appointment today and enjoy a luxury salon experience
            designed for confidence, beauty, and style.
          </p>

          <button className="mt-10 bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-zinc-900 transition-all duration-300">
            Schedule Appointment
          </button>
        </div>
      </section>

      <footer className="bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold">
              Helen <span className="text-yellow-400">Friends</span>
            </h2>
            <p className="mt-4 text-zinc-400 leading-7 max-w-md">
              A professional beauty salon for hair, makeup, skincare, spa,
              grooming, and premium beauty products.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="h-11 w-11 rounded-full bg-white/10 hover:bg-yellow-500 hover:text-black grid place-items-center transition"
              >
                <FaInstagram size={19} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="h-11 w-11 rounded-full bg-white/10 hover:bg-yellow-500 hover:text-black grid place-items-center transition"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="mailto:hello@helenfriends.com"
                aria-label="Email Helen Friends"
                className="h-11 w-11 rounded-full bg-white/10 hover:bg-yellow-500 hover:text-black grid place-items-center transition"
              >
                <Mail size={19} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5">Visit Us</h3>
            <div className="space-y-4 text-zinc-400">
              <p className="flex gap-3">
                <MapPin className="text-yellow-400 shrink-0" size={20} />
                Beauty Avenue, City Center
              </p>
              <p className="flex gap-3">
                <Phone className="text-yellow-400 shrink-0" size={20} />
                +1 555 014 827
              </p>
              <p className="flex gap-3">
                <Clock className="text-yellow-400 shrink-0" size={20} />
                Mon - Sat, 9:00 AM - 8:00 PM
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>
            <div className="grid gap-3 text-zinc-400">
              <a href="#" className="hover:text-yellow-400 transition">
                Services
              </a>
              <a href="#" className="hover:text-yellow-400 transition">
                Gallery
              </a>
              <a href="#" className="hover:text-yellow-400 transition">
                Price List
              </a>
              <a href="#" className="hover:text-yellow-400 transition">
                Products
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800 py-5 text-center text-sm text-zinc-500">
          Copyright 2026 Helen Friends. All rights reserved.
        </div>
      </footer>

      <div className="fixed bottom-5 right-5 z-50">
        {chatOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-[calc(100vw-40px)] max-w-sm overflow-hidden rounded-3xl border border-yellow-500/40 bg-zinc-950 shadow-2xl shadow-black/60"
          >
            <div className="flex items-center justify-between gap-4 bg-yellow-500 p-4 text-black">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-black text-yellow-400 grid place-items-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="font-bold">Salon Chat</p>
                  <p className="text-xs text-black/70">Usually replies now</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="h-9 w-9 rounded-full bg-black/10 hover:bg-black hover:text-white grid place-items-center transition"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((chat, index) => (
                <div
                  key={`${chat.from}-${index}`}
                  className={`flex ${
                    chat.from === "guest" ? "justify-end" : "justify-start"
                  }`}
                >
                  <p
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      chat.from === "guest"
                        ? "bg-yellow-500 text-black"
                        : "bg-zinc-900 text-zinc-200"
                    }`}
                  >
                    {chat.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-800 p-3 flex gap-2">
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") sendMessage();
                }}
                placeholder="Type your message..."
                className="min-w-0 flex-1 rounded-full bg-zinc-900 px-4 py-3 text-sm outline-none ring-1 ring-transparent focus:ring-yellow-500"
              />
              <button
                onClick={sendMessage}
                className="h-11 w-11 rounded-full bg-yellow-500 text-black grid place-items-center hover:bg-yellow-400 transition"
                aria-label="Send chat message"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        ) : (
          <button
            onClick={() => setChatOpen(true)}
            className="h-14 w-14 rounded-full bg-yellow-500 text-black shadow-xl shadow-black/50 grid place-items-center hover:bg-yellow-400 transition"
            aria-label="Open chat"
          >
            <MessageCircle size={24} />
          </button>
        )}
      </div>
    </main>
  );
}
