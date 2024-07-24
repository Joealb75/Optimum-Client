import { useState } from "react";

export const SiteNavBar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-white">Optimum Mens Health</h1>
        </div>
        <div className="flex space-x-8">
          <a href="/" className="text-white hover:text-[#B87333]">
            Home
          </a>
          <a href="/contact" className="text-white hover:text-[#B87333]">
            Contact
          </a>
          <a href="/articles" className="text-white hover:text-[#B87333]">
            Articles
          </a>
          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="text-white hover:text-[#B87333]">
              Services ⌄
            </button>
            {isServicesOpen && (
              <div className="absolute mt-2 bg-[#404040] rounded shadow-lg z-50">
                <a
                  href="#" // Change to actual service links 
                  className="block px-4 py-2 text-white hover:text-[#B87333]"
                >
                  Example Service 1
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-white hover:text-[#B87333]"
                >
                  Example Service 2
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};



