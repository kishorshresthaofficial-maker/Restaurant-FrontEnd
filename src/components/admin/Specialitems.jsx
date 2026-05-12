import React, { useState } from "react";

const Specialitems = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mt-4">
      <h1 className="font-bold text-2xl">Add Chef's Special</h1>
      <div className="w-full pr-5">
        <form className="flex flex-col gap-4 mt-4">
          <div className="flex gap-5">
            <input
              type="text"
              placeholder="Enter Title"
              className="border
                border-gray-300 rounded-md p-2"
            />
            <input
              type="file"
              accept="image"
              onChange={handleImageChange}
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 
"
            />
          </div>
          <div className="w-50 h-auto bg-amber-400">
            {preview && <img src={preview} className="h-auto" />}
          </div>

           <textarea
            placeholder="Content"
            className="border border-gray-300 rounded-md p-2"
            rows={3}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 w-1/4 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Specialitems;
