import { useState, useEffect } from 'react';
import { useCurrentUser } from "../../TSQ_hooks/useCurrentUser.js";
import { UseAllConsultations } from "../../TSQ_hooks/useAllConsultations.js";
import { UseGetOfficeUserById } from "../../TSQ_hooks/useGetOfficeUserById.js";
import { ConsultationCard } from "../consultation/ConsultationCard.jsx";
import { getAllUsers } from "../../data-services/user_data.js";

export const AllConsultations = () => {
  const { currentUser, isLoading: userLoading, error: userError } = useCurrentUser();
  const { data: allConsultations, isLoading: consultationsLoading, error: consultationsError } = UseAllConsultations();
  const { data: officeUser, isLoading: officeUserLoading, error: officeUserError } = UseGetOfficeUserById(currentUser);

  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    getAllUsers().then(setUsers).catch(console.error);
  }, []);

  if (userLoading || consultationsLoading || officeUserLoading) {
    return <div>Loading...</div>;
  }

  if (userError) {
    return <div>Error loading user: {userError.message}</div>;
  }

  if (consultationsError) {
    return <div>Error loading consultations: {consultationsError.message}</div>;
  }

  if (officeUserError) {
    return <div>Error loading office user: {officeUserError.message}</div>;
  }

  const userConsultations = allConsultations.filter(
    (consultation) => consultation.assigned_to_user === currentUser?.id
  );

  const consultationsToDisplay = officeUser?.isAdmin ? allConsultations : userConsultations;

  const filteredConsultations = statusFilter === 'All' 
    ? consultationsToDisplay 
    : consultationsToDisplay.filter(consultation => consultation.status === statusFilter);

  const sortedConsultations = filteredConsultations.sort((consult1, consult2) => new Date(consult2.created_date) - new Date(consult1.created_date));

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    <>
      <section className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">All Consultations</h1>
          <div className="flex items-center space-x-4">
            <select 
              value={statusFilter} 
              onChange={handleStatusFilterChange} 
              className="bg-gray-200 border rounded p-2"
            >
              <option value="All">All</option>
              <option value="New">New</option>
              <option value="Review">Review</option>
              <option value="Attempted">Attempted</option>
              <option value="Contacted">Contacted</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedConsultations && sortedConsultations.length > 0 ? (
            sortedConsultations.map((consultation) => {
              const assignedUser = users.find(user => user.id === consultation.assigned_to_user);
              const assignedUserName = assignedUser ? `${assignedUser.first_name} ${assignedUser.last_name}` : 'Unknown';
              return (
                <ConsultationCard key={consultation.id} consultation={consultation} assignedUserName={assignedUserName} />
              );
            })
          ) : (
            <p className="col-span-full text-center">No consultations available</p>
          )}
        </div>
      </section>
    </>
  );
};
