import { SiteNavBar } from "./siteNavBar.jsx";
import { MeetTheTeam } from "../providers/TheTeam.jsx";
import { ComeVisitUs_Map_Consult_half } from "../contact/visitUs.jsx";

import demoVideo from '/src/assets/videos/demo.mp4'

export const HomePage = () => {

  return (
    <>
      <SiteNavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row">
          <section className="lg:w-1/2 lg:pr-4 mb-8 lg:mb-0">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Our Mission
              </h2>
              <p className="mt-4 text-lg text-gray-700">
                At Optimum Men's Health, our mission is to empower men to
                achieve their ideal lifestyle through comprehensive,
                personalized medical care. We believe that a healthy body is the
                foundation for a fulfilling life. Our goal is to optimize men's
                health, helping them to live their best, most vibrant lives.
              </p>
              <div className="mt-6">
                <a
                  href="/about-us"
                  className="inline-block bg-gray-800 text-white px-6 py-3 rounded hover:bg-[#228B22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#228B22]"
                >
                  About Us
                </a>
              </div>
            </div>
          </section>

          {/* Video Section */}
          <div className="lg:w-1/2">
            <div className="relative">
              <video
                className="w-full object-cover h-72"
                src={demoVideo}
                autoPlay
                loop
                muted
              />
            </div>
          </div>
        </div>

        {/* Meet Your Team Section */}
        <section className="py-2">
          <MeetTheTeam />
        </section>

        {/* Come Visit Us Section */}
        <section className="py-2">
          <ComeVisitUs_Map_Consult_half />
        </section>

      </div>

    </>
  );
};
