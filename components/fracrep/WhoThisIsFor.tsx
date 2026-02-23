"use client";

export default function WhoThisIsFor() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-10 tracking-tight">
          Who This Is For
        </h2>
        <div className="space-y-10">
          <div>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-5 font-semibold text-gray-900">
              This is for you if:
            </p>
            <ul className="space-y-4 text-lg sm:text-xl text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-gray-900 mt-0.5">✓</span>
                <span>You have a proven high-ticket offer ($5k+)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-900 mt-0.5">✓</span>
                <span>
                  You're tired of inconsistent, referral-dependent lead gen
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-900 mt-0.5">✓</span>
                <span>You want to be seen as the authority in your space</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-900 mt-0.5">✓</span>
                <span>
                  You're ready to let a tool do the heavy lifting for you
                </span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-5 font-semibold text-gray-900">
              This is NOT for you if:
            </p>
            <ul className="space-y-4 text-lg sm:text-xl text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-gray-400 mt-0.5">✗</span>
                <span>You don't have a clear offer yet</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400 mt-0.5">✗</span>
                <span>
                  You're looking for a quick fix with no follow-through
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400 mt-0.5">✗</span>
                <span>
                  You want to stay anonymous — these tools put your thinking out
                  in the world
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

