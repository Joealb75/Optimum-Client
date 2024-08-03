import { useState, useEffect } from "react";
import { getAllTags, updateTag, deleteTag, createNewTag } from "../../../data-services/article_data.js";
import { getOfficeUserByUserID } from "../../../data-services/user_data.js";
import { useCurrentUser } from "../../../TSQ_hooks/useCurrentUser.js";

export const ViewAllTags = () => {
  const { currentUser } = useCurrentUser();
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [newTagName, setNewTagName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingNewTag, setIsCreatingNewTag] = useState(false);
  const [officeUser, setOfficeUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTags();
    fetchOfficeUser();
  }, [currentUser]);

  const fetchTags = async () => {
    try {
      const tagsData = await getAllTags();
      setTags(tagsData);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchOfficeUser = async () => {
    try {
      const officeUserData = await getOfficeUserByUserID(currentUser);
      setOfficeUser(officeUserData);
    } catch (error) {
      console.error("Error fetching office user:", error);
    }
  };

  const handleTagClick = (tag) => {
    if (officeUser?.isAdmin) {
      setSelectedTag(tag);
      setNewTagName(tag.tag);
      setIsCreatingNewTag(false);
      setIsModalOpen(true);
      setError(null);
    }
  };

  const handleUpdateTag = async () => {
    try {
      await updateTag(selectedTag.id, { tag: newTagName });
      fetchTags();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating tag:", error);
    }
  };

  const handleDeleteTag = async () => {
    try {
      await deleteTag(selectedTag.id);
      fetchTags();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  const handleCreateNewTagClick = () => {
    setSelectedTag(null);
    setNewTagName("");
    setIsCreatingNewTag(true);
    setIsModalOpen(true);
    setError(null);
  };

  const handleCreateNewTag = async () => {
    if (tags.some(tag => tag.tag.toLowerCase() === newTagName.toLowerCase())) {
      setError("Tag already exists");
      return;
    }

    try {
      await createNewTag({ tag: newTagName });
      fetchTags();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating new tag:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Article Tags</h1>
        {officeUser?.isAdmin && (
          <button
            onClick={handleCreateNewTagClick}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-[#228B22]"
          >
            New Tag
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleTagClick(tag)}
          >
            <h2 className="text-lg font-bold text-gray-900">{tag.tag}</h2>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">{isCreatingNewTag ? "Create New Tag" : "Edit Tag"}</h2>
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="flex justify-end space-x-4">
              {isCreatingNewTag ? (
                <button
                  onClick={handleCreateNewTag}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-[#228B22]"
                >
                  Submit
                </button>
              ) : (
                <>
                  <button
                    onClick={handleUpdateTag}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleDeleteTag}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </>
              )}
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};