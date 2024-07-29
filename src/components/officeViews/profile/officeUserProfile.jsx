import { useState, useEffect } from 'react';
import { useCurrentUser } from "../../../TSQ_hooks/useCurrentUser.js";
import { UseGetOfficeUserById } from "../../../TSQ_hooks/useGetOfficeUserById.js";
import { getAllUsers } from "../../../data-services/user_data.js";
import { OfficeUserFormData } from './officeUserFormData.jsx';
import { UserFormData } from './userFormData.jsx';

export const OfficeUserProfile = () => {
  const { currentUser, isLoading: userLoading, error: userError } = useCurrentUser();
  const { data: officeUser, isLoading: officeUserLoading, error: officeUserError } = UseGetOfficeUserById(currentUser);

  const [allUsers, setAllUsers] = useState([]);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);

  useEffect(() => {
    getAllUsers().then(setAllUsers).catch(console.error);
  }, []);

  useEffect(() => {
    if (currentUser && allUsers.length > 0) {
      const userInfo = allUsers.find(user => user.id === currentUser.id);
      setCurrentUserInfo(userInfo);
    }
  }, [currentUser, allUsers]);

  if (userLoading || officeUserLoading || !currentUserInfo) {
    return <div>Loading...</div>;
  }

  if (userError) {
    return <div>Error loading user: {userError.message}</div>;
  }

  if (officeUserError) {
    return <div>Error loading office user: {officeUserError.message}</div>;
  }

  return (
    <>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <section className='py-4'>
            <OfficeUserFormData officeUser={officeUser} onUpdate={() => window.location.reload()} />
        </section>
        <hr className="border-t border-gray-300 my-2" />
        <section className='py-4'>
            <UserFormData user={currentUserInfo} onUpdate={() => window.location.reload()} />
        </section>
      </div>
    </>
  );
};


