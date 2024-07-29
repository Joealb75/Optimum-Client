

export const ConsultationCard = ({ consultation, assignedUserName }) => {
    // if the consultation.comment is > 75ch display the first 75 and add "..." to the end
    // this was done to keep a consistent card size 
    const shortenedComment =
      consultation.comment.length > 75
        ? consultation.comment.substring(0, 75) + "..."
        : consultation.comment;

      const shortenedProviderComment =
      consultation.providerComment.length > 75
        ? consultation.providerComment.substring(0, 75) + "..."
        : consultation.providerComment;
  
    const statusOptions = [
      { value: 'New', label: 'New', color: 'bg-green-500 text-white' },
      { value: 'Review', label: 'Review', color: 'bg-yellow-500 text-white' },
      { value: 'Attempted', label: 'Attempted', color: 'bg-blue-500 text-white' },
      { value: 'Contacted', label: 'Contacted', color: 'bg-black text-white' },
      { value: 'Delete', label: 'Delete', color: 'bg-red-500 text-white' },
    ];
  
    const statusLabelClass = statusOptions.find(statusOption => statusOption.value === consultation.status)?.color;
    // find the correct status object based on the consultation.status and apply the correct color to the <span> tag
    
    return (
      <a
        href={`/consultation/${consultation.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white border rounded-lg p-4 mb-4 shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <div className="flex justify-between mb-2">
          <span>
            Date: {new Date(consultation.created_date).toLocaleDateString()}
          </span>
          <span className={`px-2 py-1 rounded ${statusLabelClass}`}>
            {consultation.status}
          </span>
        </div>
        <div className="mb-2">
          <strong>Name:</strong> {consultation.full_name}
        </div>
        <div className="mb-2">
          <strong>Email:</strong> {consultation.email}
        </div>
        <div className="mb-2">
          <strong>Cell:</strong> {consultation.phone_number}
        </div>
        <div className="mb-2">
          <strong>Comment:</strong>
          <p>{shortenedComment}</p> 
        </div>
        <div className="mb-2">
          <strong>Provider Comment:</strong> 
          <p dangerouslySetInnerHTML={{ __html: shortenedProviderComment }} />
        </div>
        <div >
          <strong>Assigned:</strong> {assignedUserName}
        </div>
      </a>
    );
  };
  
