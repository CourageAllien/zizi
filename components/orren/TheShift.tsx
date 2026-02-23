"use client";

import AnimateOnScroll from "../partner/AnimateOnScroll";

export default function TheShift() {
  return (
    <section id="the-shift" className="py-20 md:py-32 bg-gray-50 text-black">
      <div className="max-w-4xl mx-auto px-6">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-900">
            The Shift
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            The smartest high-ticket sellers aren&apos;t just creating content anymore.
          </p>
          <p className="text-xl md:text-2xl font-semibold text-gray-900 mb-8 text-center">
            They&apos;re building tools.
          </p>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            A free tool that solves a real problem your ideal client has right before they&apos;d hire someone like you. They use it, they get value, they see your thinking — and by the time they reach out, they already trust you.
          </p>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            It&apos;s not a gimmick. It&apos;s how the best in your space are quietly building pipelines that run without them.
          </p>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 mt-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              The only problem? Building the right tool — one that actually reflects your methodology and converts — used to take a development team and months of time.
            </p>
            <p className="text-xl font-semibold text-gray-900 mt-4">
              Not anymore.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

