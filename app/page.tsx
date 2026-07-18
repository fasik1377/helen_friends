"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const services = [
  {
    number: "01",
    title: "Silk Press & Styling",
    description:
      "A smooth, weightless finish with movement, body and healthy shine.",
    price: "From $85",
    image: "/images/hair1.jpg",
  },
  {
    number: "02",
    title: "Color & Dimension",
    description:
      "Rich, considered color shaped around your complexion and personal style.",
    price: "Consultation",
    image: "/images/hair2.jpg",
  },
  {
    number: "03",
    title: "Extensions & Installs",
    description:
      "Natural-looking length and fullness, fitted and finished with care.",
    price: "From $140",
    image: "/images/hair6.jpg",
  },
  {
    number: "04",
    title: "Bridal & Occasion",
    description:
      "Camera-ready styling that holds beautifully through every celebration.",
    price: "From $125",
    image: "/images/hair4.jpg",
  },
];

const gallery = [
  { src: "/images/hair10.jpg", alt: "Glossy black curls styled at Helen Friends", className: "md:col-span-2 md:row-span-2" },
  { src: "/images/hair12.jpg", alt: "Smooth voluminous black hairstyle", className: "" },
  { src: "/images/hair2.jpg", alt: "Warm dimensional copper curls", className: "" },
  { src: "/images/hair14.jpg", alt: "Soft full curls and healthy shine", className: "" },
  { src: "/images/hair8.jpg", alt: "Long softly curled hairstyle", className: "md:col-span-2" },
  { src: "/images/hair3.jpg", alt: "Salon finished curls", className: "" },
  { src: "/images/hair7.jpg", alt: "Polished special occasion hairstyle", className: "" },
  { src: "/images/hair13.jpg", alt: "Healthy styled natural hair", className: "md:col-span-2" },
];

const heroImages = [
  {
    src: "/images/hair1.jpg",
    alt: "Signature glossy curls by Helen Friends Hair Salon",
    position: "object-[center_30%]",
  },
  {
    src: "/images/hair10.jpg",
    alt: "Soft black curls with a polished salon finish",
    position: "object-[center_28%]",
  },
  {
    src: "/images/hair12.jpg",
    alt: "Full healthy hair styled at Helen Friends",
    position: "object-top",
  },
];

const productAds = [
  {
    name: "Silk Finish",
    type: "Shine serum",
    price: "$24",
    accent: "#c2b280",
    bottle: "rounded-t-[42%]",
  },
  {
    name: "Crown Care",
    type: "Hydration mask",
    price: "$32",
    accent: "#8f6b59",
    bottle: "rounded-t-lg",
  },
  {
    name: "Smooth Hold",
    type: "Edge control",
    price: "$18",
    accent: "#d8cda9",
    bottle: "rounded-full",
  },
];

function ProductAdRail() {
  const repeatingProducts = [...productAds, ...productAds];

  return (
    <div className="absolute bottom-[6%] right-0 top-[6%] z-20 hidden w-[29%] overflow-hidden sm:block">
      <div
        className="h-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <motion.div
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="grid gap-3 py-5"
        >
          {repeatingProducts.map((product, index) => (
            <motion.article
              key={`${product.name}-${index}`}
              whileHover={{ rotateY: -8, x: -8, scale: 1.03 }}
              className="relative h-40 overflow-hidden border border-white/25 bg-[#2b1d17] p-3 text-white shadow-[0_18px_45px_rgba(43,29,23,0.34)]"
              style={{
                transformPerspective: 800,
                rotateY: index % 2 ? -5 : 5,
              }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `linear-gradient(135deg, ${product.accent}, transparent 62%)`,
                }}
              />
              <div className="relative flex h-full items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[0.5rem] font-bold uppercase tracking-[0.16em] text-[#c2b280]">
                    Salon pick
                  </p>
                  <h3 className="display-font mt-2 text-xl leading-none">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-[0.62rem] text-white/55">{product.type}</p>
                  <p className="mt-3 text-xs font-bold">{product.price}</p>
                </div>
                <div className="relative h-[108px] w-[46px] shrink-0">
                  <div className="absolute left-1/2 top-0 h-4 w-5 -translate-x-1/2 bg-[#d9ceb0]" />
                  <div
                    className={`absolute inset-x-0 bottom-0 top-3 border border-white/30 ${product.bottle}`}
                    style={{
                      background: `linear-gradient(145deg, ${product.accent}, #5c4033)`,
                    }}
                  >
                    <div className="absolute left-1/2 top-[44%] w-[82%] -translate-x-1/2 bg-[#fbf8f1] px-1 py-2 text-center text-[0.42rem] font-black uppercase tracking-[0.08em] text-[#5c4033]">
                      H.F.
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
      <div className="pointer-events-none absolute right-2 top-1/2 z-30 -translate-y-1/2 [writing-mode:vertical-rl]">
        <p className="text-[0.48rem] font-black uppercase tracking-[0.22em] text-white/45">
          Beauty essentials
        </p>
      </div>
    </div>
  );
}

function HeroPhoto() {
  const [activeImage, setActiveImage] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
    stiffness: 110,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 110,
    damping: 20,
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="photo-depth relative h-full min-h-[440px] w-full overflow-visible"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width - 0.5);
        y.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1100 }}
        initial={{ opacity: 0, y: 28, rotateZ: 2 }}
        animate={{ opacity: 1, y: 0, rotateZ: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-[4%] right-0 top-0 overflow-hidden shadow-[0_35px_80px_rgba(43,29,23,0.28)] sm:right-[21%]"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={heroImages[activeImage].src}
            initial={{ opacity: 0, x: 90, scale: 1.08, rotateY: -7 }}
            animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, x: -75, scale: 0.96, rotateY: 6 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[activeImage].src}
              alt={heroImages[activeImage].alt}
              fill
              priority={activeImage === 0}
              sizes="(max-width: 1024px) 92vw, 43vw"
              className={`object-cover ${heroImages[activeImage].position}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2b1d17]/25 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-4 left-4 z-20 flex gap-1.5">
          {heroImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`Show hero image ${index + 1}`}
              className={`h-1.5 transition-all ${
                activeImage === index ? "w-8 bg-white" : "w-3 bg-white/45"
              }`}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [-3, 1, -3], z: [30, 70, 30] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[5%] left-0 z-20 h-[34%] w-[27%] overflow-hidden border-4 border-[#fbf8f1] shadow-2xl"
      >
        <Image
          src="/images/hair1.jpg"
          alt="Close view of signature glossy curls"
          fill
          sizes="220px"
          className="object-cover object-[center_28%]"
        />
      </motion.div>
      <motion.div
        animate={{ y: [0, 11, 0], rotate: [4, 0, 4], z: [20, 55, 20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[20%] top-[8%] z-10 hidden h-[26%] w-[24%] overflow-hidden border-4 border-[#fbf8f1] shadow-2xl sm:block"
      >
        <Image
          src="/images/hair2.jpg"
          alt="Dimensional hair color"
          fill
          sizes="190px"
          className="object-cover object-top"
        />
      </motion.div>
      <ProductAdRail />
    </motion.div>
  );
}

const chatbotReplies = [
  "We would love to help. You can reserve a preferred date on our booking page.",
  "For color or extensions, we recommend starting with a consultation.",
  "We are located at 1074 South Ironton St in Aurora. You can also call us at (720)-315-5051.",
];

function SalonChatbot() {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "salon",
      text: "Hi, welcome to Helen Friends. How can we help with your hair today?",
    },
  ]);

  function sendMessage() {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    const normalized = trimmedMessage.toLowerCase();
    const replyIndex = normalized.includes("where") || normalized.includes("location")
      ? 2
      : normalized.includes("color") || normalized.includes("extension")
        ? 1
        : 0;

    setMessages((current) => [
      ...current,
      { from: "guest", text: trimmedMessage },
      { from: "salon", text: chatbotReplies[replyIndex] },
    ]);
    setMessage("");
  }

  return (
    <div className="fixed bottom-4 right-4 z-[80] sm:bottom-6 sm:right-6">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.section
            key="chat-panel"
            initial={{ opacity: 0, y: 25, scale: 0.94, rotateX: -8 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 18, scale: 0.94 }}
            className="w-[calc(100vw-32px)] max-w-[350px] overflow-hidden border border-[#c2b280]/45 bg-[#fbf8f1] shadow-[0_28px_80px_rgba(43,29,23,0.34)]"
            style={{ transformPerspective: 900 }}
          >
            <header className="flex items-center justify-between bg-[#5c4033] px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center bg-[#c2b280] text-[#2b1d17]">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold">Salon assistant</p>
                  <p className="mt-0.5 text-[0.62rem] text-white/60">Here to help</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center border border-white/15 transition hover:border-white/50"
                aria-label="Close salon chatbot"
                title="Close chat"
              >
                <X size={17} />
              </button>
            </header>
            <div className="max-h-60 space-y-3 overflow-y-auto p-4">
              {messages.map((chat, index) => (
                <div
                  key={`${chat.from}-${index}`}
                  className={`flex ${chat.from === "guest" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[84%] px-3 py-2.5 text-xs leading-5 ${
                      chat.from === "guest"
                        ? "bg-[#5c4033] text-white"
                        : "bg-[#eee6d8] text-[#4d3e36]"
                    }`}
                  >
                    {chat.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-[#5c4033]/15 p-3">
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") sendMessage();
                }}
                placeholder="Ask about services..."
                aria-label="Chat message"
                className="field min-h-11 flex-1 py-2 text-xs"
              />
              <button
                type="button"
                onClick={sendMessage}
                className="grid h-11 w-11 shrink-0 place-items-center bg-[#5c4033] text-white transition hover:bg-[#3f2b22]"
                aria-label="Send chat message"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.section>
        ) : (
          <motion.button
            key="chat-button"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4, rotate: -3 }}
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-14 w-14 place-items-center bg-[#5c4033] text-white shadow-[0_16px_45px_rgba(43,29,23,0.35)]"
            aria-label="Open salon chatbot"
            title="Chat with us"
          >
            <MessageCircle size={23} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#fbf8f1]">
      <SiteHeader />

      <section className="noise relative min-h-[calc(100svh-80px)] border-b border-[#5c4033]/15">
        <div className="mx-auto grid min-h-[calc(100svh-80px)] max-w-[1440px] items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75 }}
            className="relative z-10 max-w-2xl"
          >
            <p className="eyebrow">Aurora, Colorado · Hair artistry</p>
            <h1 className="display-font mt-5 text-[clamp(3.4rem,7vw,7rem)] font-normal leading-[0.88] text-[#2b1d17]">
              Helen Friends
              <span className="mt-2 block italic text-[#5c4033]">Hair Salon</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#63564e] sm:text-lg sm:leading-8">
              Elevated styling, healthy hair care and a finish that still feels
              like you. Every appointment is shaped around your hair, your
              occasion and your confidence.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex h-13 items-center justify-center gap-3 bg-[#5c4033] px-6 text-sm font-bold text-white transition hover:bg-[#3f2b22]"
              >
                Book your appointment <ArrowRight size={17} />
              </Link>
              <a
                href="#gallery"
                className="inline-flex h-13 items-center justify-center border border-[#5c4033]/25 px-6 text-sm font-bold text-[#5c4033] transition hover:border-[#5c4033]"
              >
                Explore our work
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#5c4033]/15 pt-6 text-sm text-[#63564e]">
              <span className="flex items-center gap-2"><Check size={16} className="text-[#5c4033]" /> Personalized care</span>
              <span className="flex items-center gap-2"><Check size={16} className="text-[#5c4033]" /> Premium finish</span>
            </div>
          </motion.div>
          <div className="h-[54vh] min-h-[440px] lg:h-[calc(100svh-150px)] lg:max-h-[760px]">
            <HeroPhoto />
          </div>
        </div>
      </section>

      <section className="bg-[#5c4033] text-white">
        <div className="mx-auto grid max-w-[1440px] divide-y divide-white/15 px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-12">
          <a href="tel:+17203155051" className="flex items-center gap-4 py-6 md:px-7 md:first:pl-0">
            <Phone size={20} className="text-[#c2b280]" />
            <div><p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/55">Call us</p><p className="mt-1 text-sm font-semibold">(720)-315-5051</p></div>
          </a>
          <a href="https://maps.google.com/?q=1074+South+Ironton+St+Aurora+CO+80012" target="_blank" rel="noreferrer" className="flex items-center gap-4 py-6 md:px-7">
            <MapPin size={20} className="text-[#c2b280]" />
            <div><p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/55">Visit us</p><p className="mt-1 text-sm font-semibold">1074 South Ironton St, Aurora</p></div>
          </a>
          <Link href="/book" className="flex items-center gap-4 py-6 md:px-7 md:last:pr-0">
            <CalendarDays size={20} className="text-[#c2b280]" />
            <div><p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/55">Appointments</p><p className="mt-1 text-sm font-semibold">Reserve your time online</p></div>
          </Link>
        </div>
      </section>

      <section id="services" className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid items-end gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Signature services</p>
              <h2 className="display-font mt-4 max-w-xl text-5xl leading-[0.98] text-[#2b1d17] sm:text-6xl">
                Beautiful hair, thoughtfully done.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[#6d6058] lg:justify-self-end">
              We pair technical skill with attentive consultation, protecting
              your hair health while creating the shape, color and finish you want.
            </p>
          </div>

          <div className="mt-14 border-t border-[#5c4033]/20">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.06 }}
                className="group grid items-center gap-6 border-b border-[#5c4033]/20 py-7 md:grid-cols-[70px_1fr_1.4fr_120px]"
              >
                <span className="display-font text-2xl italic text-[#c2b280]">{service.number}</span>
                <div className="relative hidden aspect-[4/3] max-w-[170px] overflow-hidden md:block">
                  <Image src={service.image} alt="" fill sizes="170px" className="object-cover object-top transition duration-500 group-hover:scale-105" />
                </div>
                <div>
                  <h3 className="display-font text-3xl text-[#2b1d17]">{service.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#73665e]">{service.description}</p>
                </div>
                <p className="text-sm font-bold text-[#5c4033] md:text-right">{service.price}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-[#2b1d17] py-24 text-white sm:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c2b280]">The Helen Friends finish</p>
              <h2 className="display-font mt-4 text-5xl leading-none sm:text-6xl">Made to be seen.</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/62">
              Real clients, signature movement and shine. A closer look at work
              created in our salon.
            </p>
          </div>

          <div className="mt-12 grid auto-rows-[260px] grid-cols-1 gap-3 sm:grid-cols-2 md:auto-rows-[310px] md:grid-cols-4">
            {gallery.map((image, index) => (
              <motion.figure
                key={image.src}
                initial={{ opacity: 0, rotateY: index % 2 ? 8 : -8, y: 25 }}
                whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: (index % 4) * 0.07 }}
                whileHover={{ scale: 0.985, rotateY: index % 2 ? -2 : 2 }}
                className={`photo-depth relative overflow-hidden bg-[#3b2a22] ${image.className}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition duration-700 hover:scale-105"
                />
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative min-h-[520px]"
          >
            <div className="absolute bottom-0 left-0 top-0 w-[78%] overflow-hidden">
              <Image src="/images/hair6.jpg" alt="A happy Helen Friends Hair Salon client" fill sizes="(max-width: 1024px) 78vw, 38vw" className="object-cover object-top" />
            </div>
            <div className="absolute bottom-[8%] right-0 h-[46%] w-[42%] overflow-hidden border-[6px] border-[#fbf8f1] shadow-2xl">
              <Image src="/images/hair9.jpg" alt="Detailed salon hair finish" fill sizes="260px" className="object-cover object-top" />
            </div>
          </motion.div>
          <div className="lg:pl-8">
            <p className="eyebrow">Care in every detail</p>
            <h2 className="display-font mt-4 text-5xl leading-[1.02] text-[#2b1d17] sm:text-6xl">
              Your hair deserves expertise and ease.
            </h2>
            <p className="mt-7 text-base leading-8 text-[#6d6058]">
              At Helen Friends Hair Salon, the experience starts by listening.
              We take time to understand your routine, your hair goals and how
              you want to feel when you leave.
            </p>
            <p className="mt-4 text-base leading-8 text-[#6d6058]">
              From healthy-hair maintenance to a complete transformation, every
              service is delivered with precision, warmth and lasting polish.
            </p>
            <div className="mt-9 grid grid-cols-2 border-y border-[#5c4033]/20 py-6">
              <div className="border-r border-[#5c4033]/20">
                <p className="display-font text-4xl text-[#5c4033]">14+</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#75685f]">Signature looks</p>
              </div>
              <div className="pl-7">
                <p className="display-font text-4xl text-[#5c4033]">1:1</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#75685f]">Personal care</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#c2b280]">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1fr_auto] lg:px-12">
          <div>
            <div className="flex gap-1 text-[#5c4033]" aria-label="Five star experience">
              {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={16} fill="currentColor" />)}
            </div>
            <h2 className="display-font mt-4 text-4xl leading-tight text-[#2b1d17] sm:text-5xl">
              Ready for hair that moves with you?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4f4038]">
              Choose your service and preferred time. We’ll take care of the rest.
            </p>
          </div>
          <Link href="/book" className="inline-flex h-13 items-center justify-center gap-3 bg-[#2b1d17] px-7 text-sm font-bold text-white transition hover:bg-[#5c4033]">
            Book appointment <Sparkles size={17} />
          </Link>
        </div>
      </section>

      <SiteFooter />
      <SalonChatbot />
    </main>
  );
}
