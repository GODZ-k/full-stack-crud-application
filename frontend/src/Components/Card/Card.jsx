/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";
import { Form } from "../index.js";

function Card({ data }) {
  const [editingBook, seteditingBook] = useState(null);

  const handleEdit = (book) => {
    seteditingBook(book);
  };

  const handleFormSubmit = ()=>{
    seteditingBook(null)
  }

  async function deleteBookItem(id) {
    const formData = new FormData();
    formData.append("id", id);

    try {
      await axios.post("http://localhost:3000/api/v1/books/delete", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Book deleted successfully");
    } catch (error) {
      alert("Error deleting book", error);
    }
  }
  return (
    <>
      {editingBook ? (<Form bookData={editingBook} onSubmit={handleFormSubmit} />) : null}
      {data.map((data) => (
        <div
          key={data._id}
          className=" w-[25%] h-auto border-gray-500 rounded-md m-2 border p-2 flex"
        >
          <div className="h-[100%] w-[70%]">
            <img
              src={data.image}
              alt=""
              className=" w-[100%] h-[100%] bg-cover bg-center rounded-sm"
            />
          </div>
          <div className=" ml-2">
            <div className=" text-gray-500 text-sm flex justify-between font-semibold">
              <p>{data.createdAt}</p>
              <p>{data.year}</p>
            </div>
            <div>
              <h5 className=" font-bold">{data.title}</h5>
            </div>
            <div>
              <p>{data.description}</p>
            </div>
            <div className="my-2">
              <button
                className="p-2 border mx-2 rounded-md bg-green-700 text-white px-6"
                onClick={() => handleEdit(data)}
              >
                Edit
              </button>
              <button
                className="p-2 border-2 mx-2 rounded-md text-red-600 px-5"
                onClick={() => deleteBookItem(data._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Card;
