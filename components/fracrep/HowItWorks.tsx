"use client";

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-12">
          How It Works
        </h2>
        <div className="space-y-12">
          {/* Step 1 */}
          <div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  STEP 1 — STRATEGY SESSION
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We start with a 60-minute call to understand your offer, your
                  ideal client, and the moment they need to experience before
                  they hire you. We figure out exactly what to build.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  STEP 2 — WE BUILD IT
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  You get a fully functional, branded tool — assessment,
                  calculator, audit, scorecard, diagnostic — built to reflect
                  your methodology and positioned around your offer. Typically
                  live within 2–3 weeks.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  STEP 3 — YOU DEPLOY IT
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Share it on LinkedIn. Add it to your website. Send it to cold
                  prospects. Use it as a conversation starter. We show you how
                  to get it in front of the right people.
                </p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  STEP 4 — WE ITERATE
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Once it's live, we watch what's working and refine. When
                  you're ready, we build the next one. You stay one request at
                  a time — we stay focused on what moves the needle for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

