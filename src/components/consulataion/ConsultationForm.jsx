import { useState } from 'react';

export const ConsultationForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-lg ml-auto">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl mb-6">Schedule a Consultation</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Comment</label>
            <textarea
              className="w-full px-3 py-2 border rounded"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-[#228B22]"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl">Your Consultation Request has been received.</h2>
        </div>
      )}
    </div>
  );
};
