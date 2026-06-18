// components/cta-banner/CTABanner.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-3xl rounded-2xl bg-[#010066] px-8 py-16 text-center">
        <h2 className="text-3xl font-semibold text-white md:text-4xl">
          Ready to build faster?
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-violet-100">
          Join thousands of developers who ship more with less friction. Free to
          start, no credit card needed.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/auth/register"
            className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-[#010066] hover:bg-violet-50"
          >
            Get started for free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
          >
            Talk to sales
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;