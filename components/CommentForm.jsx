import { useState, useEffect, useRef } from "react";

import { postComment } from "../services";

const CommentForm = ({ slug }) => {
  const initialState = {
    name: "",
    email: "",
    comment: "",
    storeData: false,
  };
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (window.localStorage?.getItem("user")) {
      const user = JSON.parse(window.localStorage.getItem("user"));
      const { name, email } = user;
      setFormData((prev) => ({ ...prev, name, email }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: e.target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    setError(null);
    const { name, email, comment } = formData;

    if (!comment || !name || !email) {
      setError("All fields are required");
      return;
    }

    if (formData.storeData)
      window.localStorage.setItem("user", JSON.stringify({ name, email }));

    const commentObj = { name, email, comment, slug };

    postComment(commentObj)
      .then(() => {
        setIsSuccess(true);
        setError(null);
        setFormData(initialState);
        setTimeout(() => setIsSuccess(false), 3000);
      })
      .catch((err) => {
        setIsSuccess(false);
        setError(err);
        console.log("error", err);
      });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Add your comment
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          value={formData.comment}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-200 text-gray-700"
          placeholder="Comment"
          name="comment"
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          value={formData.name}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-200 text-gray-700"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
        <input
          type="email"
          value={formData.email}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-200 text-gray-700"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            type="checkbox"
            id="storeData"
            name="storeData"
            value={formData.storeData}
            onChange={handleChange}
          />
          <label
            htmlFor="storeData"
            className="text-gray-500 cursor-pointer ml-2"
          >
            Save my name and email for next time
          </label>
        </div>
      </div>

      {error && <p className="text-xs text-red-500">{error.message}</p>}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleSubmit}
          className="transition duration-500 animation-ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {isSuccess && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  );
};
export default CommentForm;
