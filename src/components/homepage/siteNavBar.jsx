import { useState, useRef, useEffect } from "react";

export const SiteNavBar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsServicesOpen(false);
    }, 750); // 750ms delay before closing
  };

  useEffect(() => {
    const user = localStorage.getItem("Optimum_User");
    if (user) {
      setIsUserLoggedIn(true);
    }
  }, []);

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
          <a href="/about-us" className="text-white hover:text-[#B87333]">
            Contact
          </a>
          <a href="/articles" className="text-white hover:text-[#B87333]">
            Articles
          </a>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="text-white hover:text-[#B87333]">
              Services ⌄
            </button>
            {isServicesOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 bg-white border border-gray-900 rounded shadow-lg z-50"
                style={{ minWidth: '200px' }}
              >
                <a
                  href="/services/primary-care"
                  className="block px-4 py-2 text-sm text-gray-900 hover:text-[#B87333]"
                >
                  Primary Care
                </a>
                <a
                  href="/services/testosterone-replacement"
                  className="block px-4 py-2 text-sm text-gray-900 hover:text-[#B87333]"
                >
                  Testosterone Replacement Therapy
                </a>
                <a
                  href="/services/erectile-dysfunction"
                  className="block px-4 py-2 text-sm text-gray-900 hover:text-[#B87333]"
                >
                  Erectile Dysfunction
                </a>
              </div>
            )}
          </div>
          {isUserLoggedIn && (
            <a
              href="/office-dashboard"
              className="text-white hover:text-[#B87333]"
            >
              Dashboard
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};
