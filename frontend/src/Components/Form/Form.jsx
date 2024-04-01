import { useEffect, useState } from "react";
import axios from "axios";

function Form({ bookData , onSubmit }) {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [year, setyear] = useState("");
  const [image, setimage] = useState(null);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (bookData) {
      settitle(bookData.title);
      setdescription(bookData.description);
      setyear(bookData.year);
    }
  }, [bookData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  // console.log("failed to load ", bookData);

  async function AddBook() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("year", year);
    formData.append("image", image);

    try {
      if (bookData) {
        await axios.patch(
          `http://localhost:3000/api/v1/books/update/${bookData._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Book updated successfully");

        setLoading(false);

      } else {

        await axios
          .post("http://localhost:3000/api/v1/books/create", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            alert("book added seccessfully");
            setLoading(false);
          });
      }
      onSubmit()
    } catch (error) {
      alert("error adding book", error);
      setLoading(false);
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              required
              value={title}
              name="title"
              onChange={(e) => settitle(e.target.value)}
              placeholder="Title"
              className="border-2 p-2 border-gray-600 rounded-md m-2"
            />
          </div>
          <div>
            <input
              type="text"
              name="description"
              value={description}
              required
              onChange={(e) => setdescription(e.target.value)}
              placeholder="Description"
              className="border-2 p-2 border-gray-600 rounded-md m-2"
            />
          </div>
          <div>
            <input
              type="number"
              value={year}
              name="number"
              onChange={(e) => setyear(e.target.value)}
              required
              placeholder="Number"
              className="border-2 p-2 border-gray-600 rounded-md m-2"
            />
          </div>
          <div>
            <input
              type="file"
              required={!bookData}
              name="image"
              onChange={(e) => setimage(e.target.files[0])}
              placeholder="Add Image"
              className=" border-gray-600 rounded-md m-2"
            />
          </div>
          <button
            className="border-2 border-gray-950 text-green-950 p-1 px-4 m-2"
            onClick={AddBook}
          >
            {Loading ? "Saving ..." : bookData ? "Update" : "Add Book"}
          </button>
        </form>
      </div>
    </>
  );
}

export { Form };
