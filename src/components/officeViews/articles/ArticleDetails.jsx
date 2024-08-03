import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../TSQ_hooks/useCurrentUser.js";
import { UseGetOfficeUserById } from "../../../TSQ_hooks/useGetOfficeUserById.js";
import { getArticleByID, updateArticle, deleteArticle, getAllTags } from "../../../data-services/article_data.js";
import { getAllUsers } from "../../../data-services/user_data.js";
import { QuillEditor } from "../../quill/quillEditor.jsx";

export const ArticleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useCurrentUser();
  const { data: officeUser } = UseGetOfficeUserById(currentUser);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editableArticle, setEditableArticle] = useState(null);
  const [users, setUsers] = useState([]);
  const [author, setAuthor] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagsOpen, setTagsOpen] = useState(false);

  useEffect(() => {
    getArticleByID(id).then(article => {
      setEditableArticle(article);
      setSelectedTags(article.tags || []);
    }).catch(console.error);
    getAllUsers().then(setUsers).catch(console.error);
    getAllTags().then(setTags).catch(console.error);
  }, [id]);

  useEffect(() => {
    if (editableArticle && editableArticle.user) {
      const articleAuthor = users.find(user => user.id === editableArticle.user);
      setAuthor(articleAuthor);
    }
  }, [editableArticle, users]);

  if (!editableArticle) {
    return <div>Loading...</div>;
  }

  const handleEditToggle = async () => {
    if (isEditing) {
      const formData = new FormData();
      formData.append('title', editableArticle.title);
      formData.append('article_content', editableArticle.article_content);
      formData.append('created_date', editableArticle.created_date);
      formData.append('user', editableArticle.user);
      formData.append('adminApproved', editableArticle.adminApproved);

      selectedTags.forEach(tag => {
        formData.append('tags', tag);
      });

      if (editableArticle.image instanceof File) {
        formData.append('image', editableArticle.image);
      } else {
        formData.append('existingImage', editableArticle.image);
      }

      console.log('Updating article with payload:', formData);
      try {
        await updateArticle(id, formData);
        setIsEditing(false);
        navigate("/articles-all");
      } catch (error) {
        console.error('Failed to update article:', error);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditableArticle({
      ...editableArticle,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const { name, files } = event.target;
    setEditableArticle({
      ...editableArticle,
      [name]: files[0],
    });
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(id);
      navigate("/articles-all");
    } catch (error) {
      console.error('Failed to delete article:', error);
    }
  };

  const handleContentChange = (value) => {
    setEditableArticle({
      ...editableArticle,
      article_content: value,
    });
  };

  const handleAuthorChange = (event) => {
    const newAuthorId = event.target.value;
    setEditableArticle({
      ...editableArticle,
      user: newAuthorId,
    });
    const newAuthor = users.find(user => user.id === newAuthorId);
    setAuthor(newAuthor);
  };

  const handleTagChange = (tagId) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tagId)
        ? prevSelectedTags.filter((id) => id !== tagId)
        : [...prevSelectedTags, tagId]
    );
  };

  const canEdit = officeUser?.isAdmin || (editableArticle.adminApproved === false && author?.id === currentUser?.id);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Article Detail</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-lg font-semibold">Date:</label>
          {isEditing ? (
            <input
              type="text"
              name="created_date"
              value={editableArticle.created_date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          ) : (
            <p className="text-lg">{new Date(editableArticle.created_date).toLocaleDateString()}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold">Title:</label>
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={editableArticle.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          ) : (
            <p className="text-lg">{editableArticle.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold">Content:</label>
          {isEditing ? (
            <QuillEditor
              value={editableArticle.article_content}
              onChange={handleContentChange}
            />
          ) : (
            <p className="text-lg" dangerouslySetInnerHTML={{ __html: editableArticle.article_content }}></p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold">Author:</label>
          {isEditing && officeUser?.isAdmin ? (
            <select
              name="user"
              value={editableArticle.user}
              onChange={handleAuthorChange}
              className="w-full p-2 border rounded"
            >
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-lg">{author ? `${author.first_name} ${author.last_name}` : "Unknown"}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold">Image:</label>
          {isEditing ? (
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
          ) : (
            <img src={editableArticle.image} alt={editableArticle.title} />
          )}
        </div>

        {isEditing && (
          <div className="mb-4 w-1/2">
            <div className="relative">
              <button
                type="button"
                className="w-full p-2 border rounded bg-white flex justify-between items-center"
                onClick={() => setTagsOpen((prev) => !prev)}
              >
                Select Tags <span className="ml-2">⌄</span>
              </button>
              {tagsOpen && (
                <div className="absolute z-10 w-full bg-white border rounded shadow-lg mt-1 max-h-48 overflow-y-auto">
                  {tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleTagChange(tag.id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag.id)}
                        onChange={() => handleTagChange(tag.id)}
                        className="mr-2"
                      />
                      <span>{tag.tag}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-lg font-semibold">Admin Approved:</label>
          {isEditing && officeUser?.isAdmin ? (
            <select
              name="adminApproved"
              value={editableArticle.adminApproved}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="true">Approved</option>
              <option value="false">Not Approved</option>
            </select>
          ) : (
            <p className="text-lg">{editableArticle.adminApproved ? "Approved" : "Not Approved"}</p>
          )}
        </div>

        {canEdit && (
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleEditToggle}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-[#228B22]"
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
        )}
      </div>
    </div>
  );
};
