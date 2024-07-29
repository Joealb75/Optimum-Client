import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseGetConsultationById } from "../../TSQ_hooks/useGetConsultationById.js";
import { useCurrentUser } from "../../TSQ_hooks/useCurrentUser.js";
import { UseGetOfficeUserById } from "../../TSQ_hooks/useGetOfficeUserById.js";
import { updateConsultation, deleteConsultation } from "../../data-services/consultation_data.js";
import { getAllUsers } from "../../data-services/user_data.js";

export const ConsultationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useCurrentUser();
  const { data: consultation, isLoading, error } = UseGetConsultationById(id);
  const { data: officeUser } = UseGetOfficeUserById(currentUser);

  const [isEditing, setIsEditing] = useState(false);
  const [editableConsultation, setEditableConsultation] = useState(null);
  const [users, setUsers] = useState([]);

  const assignedUser = users.find(user => user.id === editableConsultation?.assigned_to_user);
  const assignedUserName = assignedUser ? `${assignedUser.first_name} ${assignedUser.last_name}` : 'Unknown';

  useEffect(() => {
    if (consultation) {
      setEditableConsultation(consultation);
    }
  }, [consultation]);

  useEffect(() => {
    getAllUsers().then(setUsers).catch(console.error);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading consultation: {error.message}</div>;
  }

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        await updateConsultation(id, editableConsultation);
        setIsEditing(false);
        navigate("/office-dashboard");
      } catch (error) {
        console.error('Failed to update consultation:', error);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditableConsultation({
      ...editableConsultation,
      [name]: value,
    });
  };

  const handleDelete = async () => {
    try {
      await deleteConsultation(id);
      navigate("/office-dashboard"); 
    } catch (error) {
      console.error('Failed to delete consultation:', error);
    }
  };

  const statusOptions = [
    { value: 'New', label: 'New', color: 'bg-green-500 text-white' },
    { value: 'Review', label: 'Review', color: 'bg-yellow-500 text-white' },
    { value: 'Attempted', label: 'Attempted', color: 'bg-blue-500 text-white' },
    { value: 'Contacted', label: 'Contacted', color: 'bg-black text-white' },
    { value: 'Delete', label: 'Delete', color: 'bg-red-500 text-white' },
  ];

  const statusLabelClass = statusOptions.find(option => option.value === editableConsultation?.status)?.color;
   // find the correct status object based on the consultation.status and apply the correct color to the <span> tag

  return (
    <>
      
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Consultation Detail</h1>

        {editableConsultation ? (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">

            <div className="mb-4">
              <label className="block text-lg font-semibold">Date:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="created_date"
                  value={editableConsultation.created_date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              ) : (
                <p className="text-lg">
                  {new Date(editableConsultation.created_date).toLocaleDateString()}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-lg font-semibold">Status:</label>
              {isEditing ? (
                <select
                  name="status"
                  value={editableConsultation.status}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${statusOptions.find(option => option.value === editableConsultation.status)?.color}`}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value} className={option.color}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <span className={`text-lg p-2 rounded ${statusLabelClass}`}>
                  {editableConsultation.status}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-lg font-semibold">Full Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="full_name"
                  value={editableConsultation.full_name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              ) : (
                <p className="text-lg">{editableConsultation.full_name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-lg font-semibold">Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editableConsultation.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              ) : (
                <p className="text-lg">{editableConsultation.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-lg font-semibold">Cell:</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone_number"
                  value={editableConsultation.phone_number}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              ) : (
                <p className="text-lg">{editableConsultation.phone_number}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-lg font-semibold">Comment:</label>
              {isEditing ? (
                <textarea
                  name="comment"
                  value={editableConsultation.comment}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              ) : (
                <p className="text-lg">{editableConsultation.comment}</p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold">Assigned:</label>
              {isEditing && officeUser?.isAdmin ? (
                <select
                  name="assigned_to_user"
                  value={editableConsultation.assigned_to_user}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.first_name} {user.last_name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-lg">
                  {assignedUserName}
                </p>
              )}
            </div>

            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleEditToggle}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {isEditing ? "Save" : "Edit"}
              </button>
              {isEditing && officeUser?.isAdmin && (
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
            
          </div>
        ) : (
          <p>No consultation found</p>
        )}
      </div>
    </>
  );
};

