import { useState, useEffect } from "react";
import { useCurrentUser } from "../../TSQ_hooks/useCurrentUser.js";
import { getAllUsers } from "../../data-services/user_data.js";
import { UseGetOfficeUserById } from "../../TSQ_hooks/useGetOfficeUserById.js";
import { LatestConsultations } from "../consultation/LatestConsultations.jsx";
import { AdminUserList } from "./admin/AdminUserList.jsx";


export const OfficeDashboard = () => {
  const { currentUser, isLoading: userLoading, error: userError } = useCurrentUser();
  const { data: officeUser} = UseGetOfficeUserById(currentUser);

  const [users, setUsers] = useState([]);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);


  useEffect(() => {
    getAllUsers().then(setUsers).catch(console.error);
  }, []);

  useEffect(() => {
    if (currentUser && users.length > 0) {
      const userInfo = users.find(user => user.id === currentUser.id);
      setCurrentUserInfo(userInfo);
    }
  }, [currentUser, users]);

  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (userError) {
    return <div>Error loading user: {userError.message}</div>;
  }

  if (!currentUserInfo) {
    return <div>Loading user information...</div>;
  }

  return (
    <>
      <div className="p-4">
        {currentUserInfo ? (
          <p className="text-xl font-semibold">
            Welcome, {currentUserInfo.first_name} {currentUserInfo.last_name}
          </p>
        ) : (
          <p>Loading user data...</p>
        )}
        <hr className="border-t border-gray-300 my-2" />
      </div>
      <section>
        <LatestConsultations />
      </section>

      {officeUser?.isAdmin && ( 
        <section>
          <AdminUserList />
        </section>
      )}
      
      <section>

      </section>
    </>
  );
};
