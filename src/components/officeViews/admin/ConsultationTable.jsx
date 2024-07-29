import { Link } from "react-router-dom";

export const ConsultationTable = ({ consultations }) => {
  const statusOptions = [
    { value: 'New', label: 'New', color: 'bg-green-500 text-white' },
    { value: 'Review', label: 'Review', color: 'bg-yellow-500 text-white' },
    { value: 'Attempted', label: 'Attempted', color: 'bg-blue-500 text-white' },
    { value: 'Contacted', label: 'Contacted', color: 'bg-black text-white' },
    { value: 'Delete', label: 'Delete', color: 'bg-red-500 text-white' },
  ];

  const activeConsultations = consultations.filter(consultation => consultation.status !== 'Delete');
  const deleteConsultations = consultations.filter(consultation => consultation.status === 'Delete');

  const renderConsultations = (consultationsList) => (
    consultationsList.map((consultation) => {
      const statusLabelClass = statusOptions.find(statusOption => statusOption.value === consultation.status)?.color;
      return (
        <tr key={consultation.id}>
          <td className="py-2 px-4 border-b">
            {new Date(consultation.created_date).toLocaleDateString()}
          </td>
          <td className="py-2 px-4 border-b">{consultation.full_name}</td>
          <td className="py-2 px-4 border-b">
            <span className={`px-2 py-1 rounded ${statusLabelClass}`}>
              {consultation.status}
            </span>
          </td>
          {consultation.status === 'Delete' && (
            <td className="py-2 px-4 border-b">
              <Link
                to={`/consultation/${consultation.id}`}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-[#228B22]"
              >
                View
              </Link>
            </td>
          )}
        </tr>
      );
    })
  );

  return (
    <div className="overflow-x-auto">
      <div>
        <h3 className="text-xl font-semibold mb-2">Active Consultations</h3>
        <table className="min-w-full bg-white mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {renderConsultations(activeConsultations)}
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Ready To Delete</h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left"></th>
            </tr>
          </thead>
          <tbody>
            {renderConsultations(deleteConsultations)}
          </tbody>
        </table>
      </div>
    </div>
  );
};
