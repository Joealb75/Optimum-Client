import { useState, useRef, useEffect } from "react";
import { getAllConsultations } from "../../data-services/consultation_data.js";
import { useCurrentUser } from "../../TSQ_hooks/useCurrentUser.js";

export const SiteNavBar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { currentUser } = useCurrentUser();
  const [newConsultationsCount, setNewConsultationsCount] = useState(0);

  useEffect(() => {
    if (currentUser) {
      getAllConsultations()
        .then((consultations) => {
          const newCount = consultations.filter(
            (consultation) =>
              consultation.assigned_to_user === currentUser.id &&
              consultation.status === "New"
          ).length;
          setNewConsultationsCount(newCount);
        });
    }
  }, [currentUser]);

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

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBurgerMenuToggle = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-white">OPTIMUM MENS HEALTH</h1>
        </div>
        <div className="block lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={handleBurgerMenuToggle}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isBurgerMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
          {isBurgerMenuOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-900 rounded shadow-lg z-50 w-full">
              <a href="/" className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200">
                HOME
              </a>
              <a href="/about-us" className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200">
                ABOUT US
              </a>
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-200">
                  SERVICES ⌄
                </button>
                {isServicesOpen && (
                  <div
                    ref={dropdownRef}
                    className="bg-white border-t border-gray-900"
                  >
                    <a
                      href="/services/primary-care"
                      className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200"
                    >
                      PRIMARY CARE
                    </a>
                    <a
                      href="/services/testosterone-replacement"
                      className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200"
                    >
                      TESTOSTERONE REPLACEMENT THERAPY
                    </a>
                    <a
                      href="/services/erectile-dysfunction"
                      className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200"
                    >
                      ERECTILE DYSFUNCTION
                    </a>
                  </div>
                )}
              </div>
              <a href="/articles" className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200">
                ARTICLES
              </a>
              {isUserLoggedIn && (
                <a href="/office-dashboard" className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200">
                  DASHBOARD
                  {newConsultationsCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-600 rounded-full">
                      {newConsultationsCount}
                    </span>
                  )}
                </a>
              )}
              
            </div>
          )}
        </div>
        <div className={`hidden lg:flex lg:items-center lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex space-x-8 ml-auto">
            <a href="/" className="text-white hover:text-[#B87333]">
            HOME
            </a>
            <a href="/about-us" className="text-white hover:text-[#B87333]">
            ABOUT US
            </a>
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-white hover:text-[#B87333]">
              SERVICES ⌄
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
                    PRIMARY CARE
                  </a>
                  <a
                    href="/services/testosterone-replacement"
                    className="block px-4 py-2 text-sm text-gray-900 hover:text-[#B87333]"
                  >
                    TESTOSTERONE REPLACEMENT THERAPY
                  </a>
                  <a
                    href="/services/erectile-dysfunction"
                    className="block px-4 py-2 text-sm text-gray-900 hover:text-[#B87333]"
                  >
                    ERECTILE DYSFUNCTION
                  </a>
                </div>
              )}
            </div>
            {isUserLoggedIn && (
              <a
                href="/office-dashboard"
                className="text-white hover:text-[#B87333] flex items-center"
              >
                DASHBOARD
                {newConsultationsCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-600 rounded-full">
                    {newConsultationsCount}
                  </span>
                )}
              </a>
            )}
            <a href="/articles" className="text-white hover:text-[#B87333]">
              ARTICLES
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};




