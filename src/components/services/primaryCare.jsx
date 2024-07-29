import { SiteNavBar } from "../homepage/siteNavBar.jsx";
import { ClientTestimonials } from "../homepage/ClientTestimonials.jsx";
import { ConsultationForm } from "../consultation/ConsultationForm.jsx";

import general_img from '/src/assets/services/PrimaryCare/Primary_Care.svg';

export const PrimaryCare = () => {
  return (
    <>
      <SiteNavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="hero-image mb-8" style={{ backgroundImage: `url(${general_img})`, height: '400px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          
        </div>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">About Primary Care</h1>
          <p className="mt-4 text-lg text-gray-700">Information about Primary Care</p>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mt-8">Our Primary Care Services</h1>
          <p className="mt-4 text-lg text-gray-700">Copy about our Primary Care Services</p>

          <div>
            <ClientTestimonials />
          </div>

          <div className="py-4">
            <ConsultationForm />
          </div>
        </div>
      </div>
    </>
  );
};
