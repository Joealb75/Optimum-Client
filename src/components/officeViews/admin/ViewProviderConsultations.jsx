import { ConsultationTable } from "./ConsultationTable.jsx";

export const ViewProviderConsultations = ({ user, consultations, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-2xl mx-auto">
        <div className="px-6 py-4 bg-gray-800 text-white flex justify-between items-center">
          <h2 className="text-xl font-semibold">{user.first_name} {user.last_name}'s Consultations</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            &times;
          </button>
        </div>
        <div className="px-6 py-4">
          {consultations.length > 0 ? (
            <ConsultationTable consultations={consultations} />
          ) : (
            <p>No consultations available</p>
          )}
        </div>
        <div className="px-6 py-4 bg-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#228B22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#228B22]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

