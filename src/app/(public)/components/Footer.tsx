// components/footer/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/assets";
import { ThemeToggle } from "@/app/ui/theme-toggle";
import SocialLinks from "./SocialLinks";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "/changelog" },
    { label: "Roadmap", href: "/roadmap" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
    { label: "Cookie policy", href: "/cookies" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-muted/40 border-t border-border px-4 pt-16 pb-6">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={Logo}
                className="w-9 4xl:w-[40px] h-6 4xl:h-[28px]"
                alt="hexa-rgb"
              />
              <span className="font-medium text-xl 4xl:text-[26px] text-heading">
                DevCollab
              </span>
            </Link>
            <p className="mt-2 mb-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Real-time project management for software teams. Ship faster,
              together.
            </p>

            <SocialLinks/>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="mb-4 text-sm font-semibold">
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-text hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs">
            © {new Date().getFullYear()} DevCollab. All rights reserved.
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;