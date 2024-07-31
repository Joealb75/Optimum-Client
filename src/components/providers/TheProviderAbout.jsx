import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllUsers_NoToken, getAllOfficeUsers_noToken } from "../../data-services/user_data.js";
import { SiteNavBar } from "../homepage/siteNavBar.jsx";

export const TheProviderAbout = () => {
  const API_URL = "http://localhost:8000";
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [officeUser, setOfficeUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [usersData, officeUsersData] = await Promise.all([
          getAllUsers_NoToken(),
          getAllOfficeUsers_noToken(),
        ]);

        const matchedUser = usersData.find((user) => user.id === parseInt(id, 10));

        if (matchedUser) {
          const matchedOfficeUser = officeUsersData.find(
            (officeUser) => officeUser.user === matchedUser.id
          );
          setUser(matchedUser);
          setOfficeUser(matchedOfficeUser);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user or office user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !officeUser) {
    return <div>User not found</div>;
  }

  return (
    <>
      <SiteNavBar />
      <section className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <img
              src={API_URL + officeUser.profileImage}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">
              {user.first_name} {user.last_name}
            </h1>
            <p className="text-xl text-gray-500">{officeUser.profession}</p>
          </div>
          <div className="prose mx-auto">
            <p dangerouslySetInnerHTML={{ __html: officeUser.aboutMe }}></p>
          </div>
        </div>
      </section>
    </>
  );
};

