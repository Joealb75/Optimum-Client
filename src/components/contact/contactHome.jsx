import { SiteNavBar } from "../homepage/siteNavBar.jsx";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { ConsultationForm } from "../consultation/ConsultationForm.jsx";
import { ComeVisitUs_Map_Consult_half } from "./visitUs.jsx";

import general_img from "/src/assets/SVGs/contact_us.svg";

export const ContactHome = () => {
  return (
    <>
      <SiteNavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div
          className="hero-image mb-8"
          style={{
            backgroundImage: `url(${general_img})`,
            height: "400px",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <section>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 py-2">
            ABOUT US
          </h1>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-lg text-gray-700 mb-4">
              Welcome to Optimum Men's Health, where we believe in empowering
              men to lead their healthiest and most fulfilling lives. Our
              mission is to provide comprehensive, personalized medical care
              tailored to each individual's needs.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              At Optimum Men's Health, our team of dedicated professionals is
              committed to offering top-notch services that encompass all
              aspects of men's health. From routine check-ups and preventative
              care to specialized treatments and wellness programs, we are here
              to support you every step of the way.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Our state-of-the-art facility in Hendersonville, TN, is equipped
              with the latest medical technology and a comfortable environment
              to ensure you receive the best possible care. We strive to build
              lasting relationships with our patients, founded on trust,
              respect, and a shared commitment to health and wellness.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Join us at Optimum Men's Health and take the first step towards a
              healthier, happier you. We look forward to being your partner in
              health and wellness.
            </p>
          </div>
        </section>

        <section>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 mt-4 py-2">
            YOUR FIRST APPOINTMENT
          </h1>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-lg mb-4">
              Welcome to Optimum Men's Health, where we prioritize your health
              and well-being. We offer a comprehensive range of services
              tailored specifically for men. Your first appointment is crucial
              in establishing a personalized health plan.
            </p>

            <p className="text-lg mb-4">
              During your first visit, we will perform a thorough evaluation to
              understand your health needs and goals. This includes discussing
              your medical history, conducting necessary screenings, and
              creating a customized wellness plan.
            </p>

            <p className="text-lg mb-4">
              We believe in a proactive approach to health, and our team of
              experts is here to guide you every step of the way.
            </p>

            <div className="bg-white shadow-lg rounded-lg p-5">
              <h3 className="text-xl font-semibold mb-3">
                First Appointment Charge
              </h3>
              <p className="text-md">
                Please note that there is a <strong>$50 charge</strong> for your
                first appointment. This fee covers the initial consultation and
                helps us provide you with the best possible care.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-8">
          <ComeVisitUs_Map_Consult_half />
        </section>
        
      </div>
    </>
  );
};
