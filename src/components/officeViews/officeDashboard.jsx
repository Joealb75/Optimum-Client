import { useState, useEffect } from "react";
import { useCurrentUser } from "../../TSQ_hooks/useCurrentUser.js";
import { getUserByID } from "../../data-services/user_data.js";
import { UseGetOfficeUserById } from "../../TSQ_hooks/useGetOfficeUserById.js";
import { LatestConsultations } from "../consultation/LatestConsultations.jsx";
import { AdminUserList } from "./admin/AdminUserList.jsx";
import { LatestArticles } from "./articles/LatestArticles.jsx";
import { ViewAllTags } from "./tags/ViewAllTags.jsx";


export const OfficeDashboard = () => {
  const { currentUser, isLoading: userLoading, error: userError } = useCurrentUser();
  const { data: officeUser} = UseGetOfficeUserById(currentUser);

  const [currentUserInfo, setCurrentUserInfo] = useState(null);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Optimum_User"));
    const token = user ? user.token : null;

    if (currentUser && token) {
      getUserByID(currentUser.id)
        .then(setCurrentUserInfo)
        .catch(console.error);
    }
  }, [currentUser]);

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
            Welcome, {currentUserInfo.first_name}
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
        <LatestArticles />
        <hr className="border-t border-gray-300 my-2" />
      </section>

      <section>
        <ViewAllTags />
      </section>
    </>
  );
};
