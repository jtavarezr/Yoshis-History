import React, { useState } from "react";
import supabase from "../utils/clients";
import "bootstrap/dist/css/bootstrap.css";

const CreateCrewmate = () => {
  const [post, setPost] = useState({
    name: "",
    role: "",
    specialty: "",
    experiencelevel: "",
    status: "",
    category: "",
    description: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const createPost = async (event) => {
    event.preventDefault();

    if (!post.name || !post.role || !post.category || !post.experiencelevel) {
      alert("Please fill out all required fields");
      return; 
    }

    await supabase.from("crewmates").insert([
      {
        name: post.name,
        role: post.role,
        specialty: post.specialty,
        experiencelevel: parseInt(post.experiencelevel), 
        status: post.status,
        category: post.category,
        description: post.description,
      },
    ]);

    setShowSuccessMessage(true);

    setPost({
      name: "",
      role: "",
      specialty: "",
      experiencelevel: "",
      status: "",
      category: "",
      description: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="create-crewmate">
        <h1>Create a New Crewmate</h1>
      </div>

      <div>
        <form>
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Crewmate Attributes</h5>

                {/* Campos del formulario */}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Name
                  </span>
                  <input
                    id="name"
                    name="name"
                    onChange={handleChange}
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupSelect01"
                  >
                    Roles
                  </label>
                  <select
                    className="form-select"
                    id="role"
                    name="role"
                    onChange={handleChange}
                    required
                  >
                    <option defaultValue>Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Speciality
                  </span>
                  <input
                    id="specialty"
                    name="specialty"
                    onChange={handleChange}
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon2">
                    Experience Level
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    id="experiencelevel"
                    name="experiencelevel"
                    onChange={handleChange}
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    required
                  />
                </div>

                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked
                    id="status"
                    name="status"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="status">
                    Active
                  </label>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Category
                  </span>
                  <input
                    id="category"
                    name="category"
                    onChange={handleChange}
                    className="form-control"
                    aria-label="category"
                    aria-describedby="basic-addon1"
                    required
                  />
                </div>

                <div className="input-group">
                  <span className="input-group-text">Description</span>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={handleChange}
                    aria-label="With textarea"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <input type="submit" value="Submit" onClick={createPost} />
        </form>
      </div>
      {/* Mensaje emergente de éxito */}
      {showSuccessMessage && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          Crewmate created successfully!
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setShowSuccessMessage(false)}
          ></button>
        </div>
      )}
    </>
  );
};

export default CreateCrewmate;
