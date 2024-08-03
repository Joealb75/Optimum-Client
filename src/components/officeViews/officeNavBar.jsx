import { useCurrentUser } from "../../TSQ_hooks/useCurrentUser.js";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllConsultations } from "../../data-services/consultation_data.js";

export const OfficeNavBar = () => {
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
        })
        .catch((error) => {
          console.error("Error fetching consultations:", error);
        });
    }
  }, [currentUser]);

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-white">Optimum Mens Health</h1>
        </div>
        <div className="flex space-x-8">
          <Link to="/" className="text-white hover:text-[#B87333]">
            Home
          </Link>
          {currentUser && (
            <Link
              to={`/profile/${currentUser.id}`}
              className="text-white hover:text-[#B87333]"
            >
              Profile
            </Link>
          )}
          <Link to="/articles" className="text-white hover:text-[#B87333]">
            Articles
          </Link>
          <Link
              to="/office-dashboard"
              className="text-white hover:text-[#B87333] flex items-center"
            >
              Dashboard
              {newConsultationsCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-600 rounded-full">
                  {newConsultationsCount}
                </span>
              )}
            </Link>
        </div>
      </div>
    </nav>
  );
};
