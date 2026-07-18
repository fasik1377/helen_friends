import Image from "next/image";
import Link from "next/link";
import { Clock3, MapPin, Phone } from "lucide-react";
import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function SiteFooter() {
  return (
    <footer id="visit" className="bg-[#241813] text-white">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-12">
        <div>
          <Link href="/" className="inline-flex items-center gap-4">
            <Image
              src="/images/logo.png"
              alt="Helen Friends Hair Salon logo"
              width={72}
              height={64}
              className="h-16 w-[72px] object-cover"
            />
            <div>
              <p className="display-font text-2xl font-bold">Helen Friends</p>
              <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#c2b280]">
                Hair Salon
              </p>
            </div>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
            Thoughtful hair care and polished styling, made personal in Aurora,
            Colorado.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Helen Friends Hair Salon on Instagram"
              title="Instagram"
              className="grid h-11 w-11 place-items-center border border-white/15 transition hover:border-[#c2b280] hover:text-[#c2b280]"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Helen Friends Hair Salon on TikTok"
              title="TikTok"
              className="grid h-11 w-11 place-items-center border border-white/15 transition hover:border-[#c2b280] hover:text-[#c2b280]"
            >
              <FaTiktok size={17} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c2b280]">
            Contact
          </p>
          <div className="mt-6 grid gap-5 text-sm text-white/72">
            <a
              href="https://maps.google.com/?q=1074+South+Ironton+St+Aurora+CO+80012"
              target="_blank"
              rel="noreferrer"
              className="flex gap-3 leading-6 transition hover:text-white"
            >
              <MapPin className="mt-0.5 shrink-0 text-[#c2b280]" size={18} />
              <span>1074 South Ironton St<br />Aurora, CO 80012</span>
            </a>
            <a
              href="tel:+17203155051"
              className="flex items-center gap-3 transition hover:text-white"
            >
              <Phone className="shrink-0 text-[#c2b280]" size={18} />
              (720)-315-5051
            </a>
            <p className="flex gap-3 leading-6">
              <Clock3 className="mt-0.5 shrink-0 text-[#c2b280]" size={18} />
              <span>Monday - Saturday<br />9:00 AM - 7:00 PM</span>
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c2b280]">
            Explore
          </p>
          <div className="mt-6 grid gap-4 text-sm text-white/72">
            <Link href="/#services" className="transition hover:text-white">Services</Link>
            <Link href="/#gallery" className="transition hover:text-white">Our work</Link>
            <Link href="/book" className="transition hover:text-white">Book appointment</Link>
            <Link href="/login" className="transition hover:text-white">Appointment admin</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/45">
        © 2026 Helen Friends Hair Salon. All rights reserved.
      </div>
    </footer>
  );
}
