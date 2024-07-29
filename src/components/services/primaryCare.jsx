import { SiteNavBar } from "../homepage/siteNavBar.jsx";
import { ClientTestimonials } from "../homepage/ClientTestimonials.jsx";
import { ConsultationForm } from "../consultation/ConsultationForm.jsx";
import general_img from '/src/assets/services/PrimaryCare/Primary_Care.svg';

export const PrimaryCare = () => {
  const primaryCareServices = [
    "Flu shots",
    "Annual physicals",
    "Wellness & nutrition plans",
    "Annual blood work",
    "Cholesterol & prostate screenings",
    "Skin cancer screenings",
    "STD screenings",
    "Minor illnesses",
    "Skin rashes",
    "Allergy & sinus infections",
    "High blood pressure & cholesterol",
  ];

  return (
    <>
      <SiteNavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="hero-image mb-8" style={{ backgroundImage: `url(${general_img})`, height: '400px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">About Primary Care</h1>
          <p className="mt-4 text-base text-gray-700">
            At Optimum Men's Health, our primary care services are designed to provide comprehensive health care for men of all ages. We focus on preventive care, early detection of diseases, and the management of chronic conditions to help you achieve and maintain optimal health. Our experienced team of healthcare professionals is dedicated to providing personalized care that meets your unique health needs.
          </p>
          <p className="mt-4 text-base text-gray-700">
            Whether you need a routine check-up, vaccination, or treatment for a minor illness, our primary care services are here to support you. We believe in building strong relationships with our patients based on trust, communication, and respect. Our goal is to be your lifelong health partner, guiding you towards a healthier and happier life.
          </p>
          <p className="mt-4 text-base text-gray-700">
            We offer a wide range of primary care services to address your health concerns, from preventive screenings to managing chronic conditions. Our team stays up-to-date with the latest medical advancements and follows evidence-based practices to ensure you receive the best care possible. We are committed to making healthcare accessible and convenient for you, with a focus on delivering high-quality, compassionate care.
          </p>

          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 mt-8">Our Primary Care Services</h1>
          <p className="mt-4 text-base text-gray-700">We offer a variety of services to meet your primary care needs:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {primaryCareServices.map((service, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-lg font-bold text-gray-900">{service}</h2>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mt-8">
            <div className="lg:w-2/4">
              <ClientTestimonials />
            </div>
            <div className="lg:w-2/4">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

