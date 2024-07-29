import { useState, useEffect } from "react";
import { getAllUsers } from "../../../data-services/user_data.js";
import { getAllConsultations } from "../../../data-services/consultation_data.js";
import { ViewProviderConsultations } from "./ViewProviderConsultations.jsx";

export const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, consultationsData] = await Promise.all([
          getAllUsers(),
          getAllConsultations(),
        ]);
        setUsers(usersData);
        setConsultations(consultationsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getUserConsultationCounts = (userId) => {
    const userConsultations = consultations.filter(
      (consultation) => consultation.assigned_to_user === userId
    );
    const counts = {
      total: userConsultations.length,
      new: userConsultations.filter((consultation) => consultation.status === "New").length,
      review: userConsultations.filter((consultation) => consultation.status === "Review").length,
      delete: userConsultations.filter((consultation) => consultation.status === "Delete").length,
    };
    return counts;
  };

  const handleViewConsultations = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Consultation Tracker</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Provider</th>
              <th className="py-2 px-4 border-b text-left">New</th>
              <th className="py-2 px-4 border-b text-left">Review</th>
              <th className="py-2 px-4 border-b text-left">Delete</th>
              <th className="py-2 px-4 border-b text-left">Total</th>
              <th className="py-2 px-4 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const counts = getUserConsultationCounts(user.id);
              return (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.first_name} {user.last_name}</td>
                  <td className="py-2 px-4 border-b">{counts.new}</td>
                  <td className="py-2 px-4 border-b">{counts.review}</td>
                  <td className="py-2 px-4 border-b">{counts.delete}</td>
                  <td className="py-2 px-4 border-b">{counts.total}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleViewConsultations(user)}
                      className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-[#228B22]"
                    >
                      View Consultations
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedUser && (
        <ViewProviderConsultations
          user={selectedUser}
          consultations={consultations.filter((consultation) => consultation.assigned_to_user === selectedUser.id)}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
