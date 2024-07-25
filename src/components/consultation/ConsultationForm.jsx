import { useState } from 'react';
import { submitConsultation } from '../../data-services/consultation_data.js';

/*
Regular Expression Notes
"/" = start the expression
"^" = start the match at the beginning of the str
"\d" = digit 0-9 -- "\d{x}" x= number of occurrences 
"$" = Matches the ending position of the string
"/g" = global flag = find all matches in the str not just the first 
".test" = check if a str matches the conditions of a regular expression 
*/

export const ConsultationForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    comment: ''
  });
  const [errors, setErrors] = useState({});

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, ''); // replace all non-number ch using regular expression with ''
    // /[^replace anything thats not a (\d)igit]/(g) find all matches in the str, replace with ''
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
      // if the phone number is between 4-6 ch format with xxx-xxx
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    // if the phone number is 7 or more ch format with xxx-xxx-xxxx
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone_number') {
      setFormData({
        ...formData,
        [name]: formatPhoneNumber(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const checkForm = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) {
      newErrors.email = 'Email must contain "@"';
    }
    // make sure the format of the phone number is 3d-3d-4d (d=digit) || xxx-xxx-xxxx
    if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phone_number)) { // if the phone_number is not in the correct format display the error 
      newErrors.phone_number = 'Phone number must be in the format 123-456-7899';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    // Object.keys(newErrors) returns the keys of the "newErrors" object ex ['email', 'phone_number']
    // if there is an error the .length would be 1 || 2 so this expression would evaluate to false 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkForm()) return; // if checkForm is false because .length != 0 do not submit the form 
    try {
      await submitConsultation(formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting consultation:', error);
    }
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
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Comment</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
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
      ) : ( // if setSubmitted is True display this message 
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl">Your Consultation Request has been received.</h2>
          <br/>
          <p>One of our Providers will contact you at their earliest convenience.</p>
        </div>
      )}
    </div>
  );
};



