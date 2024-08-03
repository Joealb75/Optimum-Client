import { useState, useEffect } from "react";
import { UseAllConsultations } from "../../TSQ_hooks/useAllConsultations.js";
import { getAllUsers } from "../../data-services/user_data.js";
import { ConsultationCard } from "../consultation/ConsultationCard.jsx";
import { useCurrentUser } from "../../TSQ_hooks/useCurrentUser.js";
import { UseGetOfficeUserById } from "../../TSQ_hooks/useGetOfficeUserById.js";

export const LatestConsultations = () => {
  // TSQ hooks -- ___:___ is re-naming "___:" to ":___"
  const {currentUser, isLoading: userLoading, error: userError } = useCurrentUser();
  const {data: allConsultations, isLoading: consultationsLoading, error: consultationsError } = UseAllConsultations();
  const {data: officeUser, isLoading: officeUserLoading, error: officeUserError} = UseGetOfficeUserById(currentUser);

  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    getAllUsers().then(setUsers).catch(console.error);
  }, []);

  if (userLoading || consultationsLoading || officeUserLoading) {
    return <div>Loading...</div>;
    // Displays "Loading..." while data is still being fetched
  }

  // re-named error for each hook so that i could display the individual error messages if there is a problem with fetching the data
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

  const consultationsToDisplay = officeUser?.isAdmin
    ? allConsultations
    : userConsultations;
    // if the officeUser is an Admin display all consultation else only display the ones assigned to the user

  const filteredConsultations =
    statusFilter === "All"
      ? consultationsToDisplay
      : consultationsToDisplay.filter(
          (consultation) => consultation.status === statusFilter
        );
         // if the statusFilter is All(default) is True display the consultations
        // else display all consultations with the selected statusFilter

  const sortedConsultations = filteredConsultations.sort(
    (consult1, consult2) =>
      new Date(consult2.created_date) - new Date(consult1.created_date)
  );
    // sortConsultations based on the date with the newest coming first
    // Convert created_date str to Date objects and subtract to compare dates

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    <section className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Latest Consultations</h1>
        <div className="flex items-center space-x-4">
        {officeUser?.isAdmin && (
            <a
              href="/consultation-all"
              className="inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-[#228B22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#228B22]"
            >
              View All
            </a>
          )}
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
            <option value="Delete">Delete</option>
          </select>
        </div>
      </div>
      <div className="flex overflow-x-auto space-x-4">
        {sortedConsultations && sortedConsultations.length > 0 ? (
          sortedConsultations.map((consultation) => {
            const assignedUser = users.find(
              (user) => user.id === consultation.assigned_to_user
            );
            const assignedUserName = assignedUser
              ? `${assignedUser.first_name} ${assignedUser.last_name}`
              : "Unknown";
              // create a ConsultationCard for every consultation and pass it the consultation and the assignedUserName as props
            return (
              <div key={consultation.id} className="min-w-[300px]">
                <ConsultationCard
                  consultation={consultation}
                  assignedUserName={assignedUserName}
                />
              </div>
            );
          })
        ) : (
          <p>No consultations available</p>
        )}
      </div>
    </section>
  );
};
