// components/footer/Footer.tsx
import Link from "next/link";
import { FaGithub, FaLinkedinIn , FaXTwitter, FaFacebookF  } from "react-icons/fa6";
import Image from "next/image";
import { Logo, Logo1 } from "@/assets";
import { ThemeToggle } from "@/app/ui/theme-toggle";

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
    <footer className="border-t border-border bg-background px-4 pt-16 pb-6">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            {/* <Link href="/" className="flex items-center gap-2">
              <Image
                src={Logo1}
                className="w-9 4xl:w-[40px] h-6 4xl:h-[28px]"
                alt="hexa-rgb"
              />
              <p className="font-medium text-xl 4xl:text-[26px] text-dark-gray">
                DevCollab
              </p>
            </Link> */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={Logo}
                className="w-9 4xl:w-[40px] h-6 4xl:h-[28px]"
                alt="hexa-rgb"
              />
              <p className="font-medium text-xl 4xl:text-[26px] text-dark-gray">
                DevCollab
              </p>
            </Link>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Real-time project management for software teams. Ship faster,
              together.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Twitter"
              >
                <FaXTwitter />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#1b1f23]"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#0a66c2]"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https:/facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#0866ff]"
                aria-label="LinkedIn"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground hover:text-foreground"
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
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DevCollab. All rights reserved.
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;