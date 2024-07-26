import { useState, useEffect } from "react";
import { SiteNavBar } from "./siteNavBar.jsx";
import { ConsultationForm } from "../consultation/ConsultationForm.jsx";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

import men1 from "/src/assets/homeSlideShow/men1.jpeg";
import men2 from "/src/assets/homeSlideShow/men2.jpeg";
import men3 from "/src/assets/homeSlideShow/men3.jpeg";

export const HomePage = () => {
  const [allOfficeUsers, setAllOfficeUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      image:
        "https://www.gold.ac.uk/media/images-by-section/departments/music/staff/Guy-Baron.jpg",
      profession: "Physician Assistant, Certified",
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "https://www.hec.ca/en/profs/guy.pare.jpg",
      profession: "Physician Assistant, Certified",
    },
    {
      id: 3,
      name: "John Doe",
      image:
        "https://www.gold.ac.uk/media/images-by-section/departments/music/staff/Guy-Baron.jpg",
      profession: "Physician Assistant, Certified",
    },
    {
      id: 4,
      name: "Jane Smith",
      image: "https://www.hec.ca/en/profs/guy.pare.jpg",
      profession: "Physician Assistant, Certified",
    },
    {
      id: 5,
      name: "John Doe",
      image:
        "https://www.gold.ac.uk/media/images-by-section/departments/music/staff/Guy-Baron.jpg",
      profession: "Physician Assistant, Certified",
    },
    {
      id: 6,
      name: "Jane Smith",
      image: "https://www.hec.ca/en/profs/guy.pare.jpg",
      profession: "Physician Assistant, Certified",
    },
  ]);

  //! Slideshow state
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [men1, men2, men3];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [images.length]);

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

          {/* Image Slide Show */}
          <div className="lg:w-1/2">
            <div className="relative">
              <img
                className="w-full object-cover h-72"
                src={images[currentIndex]}
                alt="Slideshow"
              />
            </div>
          </div>
        </div>

        {/* Meet Your Team Section */}
        <section className="py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Meet Your Team
            </h1>
          </div>

          <div className="overflow-x-auto">
            <div className="flex space-x-6">
              {allOfficeUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-white overflow-hidden shadow rounded-lg flex-none w-60"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-center mb-4">
                      <img
                        className="w-24 h-24 rounded-full mx-auto"
                        src={user.image}
                        alt={user.name}
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {user.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        {user.profession}
                      </p>
                      <div className="mt-4">
                        <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-[#228B22] focus:outline-none focus:bg-gray-700">
                          About Me
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <ConsultationForm />
        </section>

        {/* Come Visit Us Section */}
        <section className="py-4">
          <div className="flex flex-col lg:flex-row">
            {/* Contact Information */}
            <div className="lg:w-1/2 lg:pr-4 mb-4 lg:mb-0 bg-gray-100 p-4 rounded-lg">
              <div className="text-left">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                  Come Visit Us
                </h2>
                <p className="text-sm text-gray-700 flex items-center mb-1">
                  <FaMapMarkerAlt className="mr-2 text-gray-600" />
                  125 Maple Row Blvd, Ste. 100
                  <br />
                  Hendersonville, TN 37075
                </p>
                <p className="text-sm text-gray-700 flex items-center mb-1">
                  <FaPhoneAlt className="mr-2 text-gray-600" />
                  <a href="tel:615-991-3158" className="hover:text-[#228B22]">
                    615-991-3158
                  </a>
                </p>
                <p className="text-sm text-gray-700 flex items-center">
                  <FaEnvelope className="mr-2 text-gray-600" />
                  <a
                    href="mailto:optimummenshealth@gmail.com"
                    className="hover:text-[#228B22]"
                  >
                    optimummenshealth@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="lg:w-1/2 bg-gray-900 text-white p-4 rounded-lg">
              <h3 className="text-xl font-extrabold mb-2">Business Hours</h3>
              <p className="text-sm mb-1">Monday: Closed</p>
              <p className="text-sm mb-1">Tuesday: 7 AM - 6 PM</p>
              <p className="text-sm mb-1">Wednesday: 7 AM - 6 PM</p>
              <p className="text-sm mb-1">Thursday: 7 AM - 6 PM</p>
              <p className="text-sm mb-1">Friday: 7 AM - 6 PM</p>
              <p className="text-sm mb-1">Saturday: Closed</p>
              <p className="text-sm mb-1">Sunday: Closed</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
