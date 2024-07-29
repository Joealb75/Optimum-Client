import { useState, useEffect } from 'react';
import { updateOfficeUser } from "../../../data-services/user_data.js";
import { QuillEditor } from '../../quill/quillEditor.jsx';

export const OfficeUserFormData = ({ officeUser, onUpdate }) => {
    const API_URL = 'http://localhost:8000'

    const [isEditingOfficeUser, setIsEditingOfficeUser] = useState(false);
    const [updatedOfficeUser, setUpdatedOfficeUser] = useState({
      phone_number: '',
      profession: '',
      aboutMe: '',
      profileImage: null,
    });
  
    useEffect(() => {
      if (officeUser) {
        setUpdatedOfficeUser({
          phone_number: officeUser.phone_number,
          profession: officeUser.profession,
          aboutMe: officeUser.aboutMe,
          profileImage: officeUser.profileImage,
        });
      }
    }, [officeUser]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUpdatedOfficeUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleImageChange = (e) => {
      setUpdatedOfficeUser((prevState) => ({
        ...prevState,
        profileImage: e.target.files[0],
      }));
    };
  
    const handleSaveChanges = async () => {
      try {
        const formData = new FormData();
        formData.append('phone_number', updatedOfficeUser.phone_number);
        formData.append('profession', updatedOfficeUser.profession);
        formData.append('aboutMe', updatedOfficeUser.aboutMe);

      if (updatedOfficeUser.profileImage instanceof File) {
        formData.append('profileImage', updatedOfficeUser.profileImage);
        
      } else if (updatedOfficeUser.profileImage) {
        formData.append('existingProfileImage', updatedOfficeUser.profileImage);
      }
  
        await updateOfficeUser(officeUser.id, formData);
        onUpdate();  
        setIsEditingOfficeUser(false);
      } catch (error) {
        console.error('Error updating office user info:', error);
      }
    };

    const handleEditorChange = (value) => {
      setUpdatedOfficeUser((prevState) => ({
        ...prevState,
        aboutMe: value,
      }));
    };
  
    return (
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 mb-4">
          <img
            src={API_URL + officeUser.profileImage}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full"
            onError={(e) => { e.target.onerror = null; e.target.src = 'path_to_default_image'; }}
          />
        </div>
        <div className="text-center mb-4">
          <h3 className="text-xl font-medium text-gray-900">{officeUser.profession}</h3>
        </div>
        <div className="text-center mb-4 max-w-4xl">
          <p className="text-sm text-gray-900" dangerouslySetInnerHTML={{ __html: officeUser.aboutMe }}></p>
        </div>
        <div className="w-full flex justify-end">
          <button
            onClick={() => setIsEditingOfficeUser(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-[#228B22]"
          >
            Edit Profile Info
          </button>
        </div>
  
        {isEditingOfficeUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-6xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Profile</h3>
                <button
                  onClick={() => setIsEditingOfficeUser(false)}
                  className="text-gray-900 hover:text-red-600"
                >
                  &times;
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-500">Phone number</label>
                <input
                  type="text"
                  name="phone_number"
                  value={updatedOfficeUser.phone_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-500">Profession</label>
                <input
                  type="text"
                  name="profession"
                  value={updatedOfficeUser.profession}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-500">About Me</label>
                <QuillEditor value={updatedOfficeUser.aboutMe} onChange={handleEditorChange} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-500">Profile Image</label>
                <input
                  type="file"
                  name="profileImage"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSaveChanges}
                  className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-[#228B22]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };