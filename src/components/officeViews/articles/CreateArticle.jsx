import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTags, createNewArticle } from "../../../data-services/article_data.js";
import { QuillEditor } from "../../quill/quillEditor.jsx";
import { useCurrentUser } from "../../../TSQ_hooks/useCurrentUser.js";
import { UseGetOfficeUserById } from "../../../TSQ_hooks/useGetOfficeUserById.js";

export const CreateArticle = () => {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const { data: officeUser } = UseGetOfficeUserById(currentUser);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllTags()
      .then((data) => {
        setTags(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
        setLoading(false);
      });
  }, []);

  const handleTagChange = (tagId) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tagId)
        ? prevSelectedTags.filter((id) => id !== tagId)
        : [...prevSelectedTags, tagId]
    );
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("article_content", content);
    formData.append("user", currentUser.id);
    formData.append("adminApproved", officeUser.isAdmin ? true : false);
    selectedTags.forEach((tag) => formData.append("tags", tag));
    if (image) {
      formData.append("image", image);
    }

    try {
      await createNewArticle(formData);
      navigate("/articles");
    } catch (error) {
      console.error("Error creating article:", error);
      setError("Failed to create article");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Article</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4 w-1/2">
          <label className="block text-lg font-semibold">Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold">Content:</label>
          <QuillEditor value={content} onChange={setContent} />
        </div>

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

        <div className="mb-4 w-1/2">
          <label className="block text-lg font-semibold">Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-[#228B22]"
          >
            Create Article
          </button>
        </div>

        <section className="mb-4 w-1/2 py-2"></section>
      </form>
    </div>
  );
};

