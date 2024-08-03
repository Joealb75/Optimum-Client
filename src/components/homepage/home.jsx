import { useState, useEffect } from "react";
import { SiteNavBar } from "./siteNavBar.jsx";
import { MeetTheTeam } from "../providers/TheTeam.jsx";
import { ComeVisitUs_Map_Consult_half } from "../contact/visitUs.jsx";
import { LatestArticleHome } from "../articles/LatestArticleHome.jsx";

const images = [
  "./src/assets/OptHealth_PreEdit/Front2.jpg",
  "./src/assets/OptHealth_PreEdit/Logo.jpg",
  "./src/assets/OptHealth_PreEdit/Front.jpg",
  "./src/assets/OptHealth_PreEdit/Inside9.jpg",
];

export const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3750);

      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <>
      <SiteNavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:pl-2">
          <section className="lg:w-2/5 lg:pr-8 mb-8 lg:mb-0">
            <div className="text-center lg:text-left">
              <div className="bg-white bg-opacity-75 p-8 rounded-lg">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Our Mission
                </h2>
                <p className="mt-4 text-lg text-gray-700">
                  At <strong>Optimum Men's Health</strong>, our mission is to empower men to
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
            </div>
          </section>

          <div className="lg:w-3/5">
            <div className="relative">
              <img
                className="w-full object-cover h-96 rounded-lg shadow-lg"
                src={images[currentImageIndex]}
                alt="Slideshow"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>
          </div>
        </div>

        {/* Meet Your Team Section */}
        <section className="py-2 lg:pl-8">
          <MeetTheTeam />
        </section>

        <section className="py-2 lg:pl-8">
          <LatestArticleHome />
        </section>

        {/* Come Visit Us Section */}
        <section className="py-2 lg:pl-8">
          <ComeVisitUs_Map_Consult_half />
        </section>
      </div>
    </>
  );
};








        {/* <section >
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Latest Article
              </h2>
        </section> */}