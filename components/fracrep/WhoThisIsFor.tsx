"use client";

export default function WhoThisIsFor() {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
          Who This Is For
        </h2>
        <div className="space-y-8">
          <div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4 font-medium">
              This is for you if:
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="mr-3 text-black">✓</span>
                <span>You have a proven high-ticket offer ($5k+)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-black">✓</span>
                <span>
                  You're tired of inconsistent, referral-dependent lead gen
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-black">✓</span>
                <span>You want to be seen as the authority in your space</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-black">✓</span>
                <span>
                  You're ready to let a tool do the heavy lifting for you
                </span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4 font-medium">
              This is NOT for you if:
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="mr-3 text-gray-400">✗</span>
                <span>You don't have a clear offer yet</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-gray-400">✗</span>
                <span>
                  You're looking for a quick fix with no follow-through
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-gray-400">✗</span>
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

