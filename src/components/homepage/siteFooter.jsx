import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export const SiteFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Optimum Mens Health</h2>
            <p className="mt-2 text-gray-400">
              Empowering men to achieve their ideal lifestyle through personalized medical care.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="/" className="text-gray-400 hover:text-white">
              Home
            </a>
            <a href="/about-us" className="text-gray-400 hover:text-white">
              Contact
            </a>
            <a href="/articles" className="text-gray-400 hover:text-white">
              Articles
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400 flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2 text-gray-600" />
              125 Maple Row Blvd, Ste. 100
              <br />
              Hendersonville, TN 37075
            </p>
            <p className="text-sm text-gray-400 flex items-center mb-2">
              <FaPhoneAlt className="mr-2 text-gray-600" />
              <a href="tel:615-991-3158" className="hover:text-[#B87333]">
                615-991-3158
              </a>
            </p>
            <p className="text-sm text-gray-400 flex items-center">
              <FaEnvelope className="mr-2 text-gray-600" />
              <a
                href="mailto:optimummenshealth@gmail.com"
                className="hover:text-[#B87333]"
              >
                optimummenshealth@gmail.com
              </a>
            </p>
          </div>
          <p className="text-gray-400 mt-4 md:mt-0">&copy; {new Date().getFullYear()} Optimum Mens Health. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
