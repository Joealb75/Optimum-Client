import { SiteNavBar } from "../homepage/siteNavBar.jsx";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { ConsultationForm } from "../consultation/ConsultationForm.jsx";

import general_img from '/src/assets/SVGs/contact_us1.svg';

export const ContactHome = () => {

  return (
    <>
      <SiteNavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="hero-image mb-8" style={{ backgroundImage: `url(${general_img})`, height: '400px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>

        <section>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 py-2">About Us</h1>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-lg text-gray-700 mb-4">
              Welcome to Optimum Men's Health, where we believe in empowering men to lead their healthiest and most fulfilling lives. Our mission is to provide comprehensive, personalized medical care tailored to each individual's needs.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              At Optimum Men's Health, our team of dedicated professionals is committed to offering top-notch services that encompass all aspects of men's health. From routine check-ups and preventative care to specialized treatments and wellness programs, we are here to support you every step of the way.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Our state-of-the-art facility in Hendersonville, TN, is equipped with the latest medical technology and a comfortable environment to ensure you receive the best possible care. We strive to build lasting relationships with our patients, founded on trust, respect, and a shared commitment to health and wellness.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Join us at Optimum Men's Health and take the first step towards a healthier, happier you. We look forward to being your partner in health and wellness.
            </p>
          </div>
        </section>

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
        <section className="mt-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3215.2454490739824!2d-86.60186492291905!3d36.30635429537983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8864474a0c9f2313%3A0x9ddba24edfc37ae0!2sOptimum%20Mens%20Health!5e0!3m2!1sen!2sus!4v1721985584826!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
        <section className="mt-4">
          <ConsultationForm />
        </section>
      </div>
    </>
  );
};
