import { useState, useEffect } from "react";
import { getAllOfficeUsers_noToken, getAllUsers_NoToken } from "../../data-services/user_data.js";

export const MeetTheTeam = () => {
  const API_URL = "http://localhost:8000";

  const [allUsers, setAllUsers] = useState([]);
  const [officeUsers, setOfficeUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersAndOfficeUsers = async () => {
      try {
        const [usersData, officeUsersData] = await Promise.all([
          getAllUsers_NoToken(),
          getAllOfficeUsers_noToken(),
        ]);
        setAllUsers(usersData);
        setOfficeUsers(officeUsersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users or office users:", error);
      }
    };

    fetchUsersAndOfficeUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-8">
      <div className="lg:text-left mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          MEET YOUR TEAM
        </h2>
      </div>

      <div className="overflow-x-auto">
        <div className="flex space-x-6">
          {officeUsers.map((officeUser) => {
            const user = allUsers.find((usr) => usr.id === officeUser.user);
            if (!user) return null;

            return (
              <div
                key={user.id}
                className="bg-white overflow-hidden shadow rounded-lg flex-none w-60"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-center mb-4">
                    <img
                      src={API_URL + officeUser.profileImage}
                      alt="Profile"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {user.first_name} {user.last_name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {officeUser.profession}
                    </p>
                    <div className="mt-4">
                      <a
                        href={`/about-me/${user.id}`}
                        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-[#228B22] focus:outline-none focus:bg-gray-700"
                      >
                        About Me
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
