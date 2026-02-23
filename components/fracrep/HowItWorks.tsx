"use client";

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-14 tracking-tight">
          How It Works
        </h2>
        <div className="space-y-10">
          {/* Step 1 */}
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-base">
              1
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                STEP 1 — STRATEGY SESSION
              </h3>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                We start with a 60-minute call to understand your offer, your
                ideal client, and the moment they need to experience before
                they hire you. We figure out exactly what to build.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-base">
              2
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                STEP 2 — WE BUILD IT
              </h3>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                You get a fully functional, branded tool — assessment,
                calculator, audit, scorecard, diagnostic — built to reflect
                your methodology and positioned around your offer. Typically
                live within 2–3 weeks.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-base">
              3
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                STEP 3 — YOU DEPLOY IT
              </h3>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                Share it on LinkedIn. Add it to your website. Send it to cold
                prospects. Use it as a conversation starter. We show you how
                to get it in front of the right people.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-base">
              4
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                STEP 4 — WE ITERATE
              </h3>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                Once it's live, we watch what's working and refine. When
                you're ready, we build the next one. You stay one request at
                a time — we stay focused on what moves the needle for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

