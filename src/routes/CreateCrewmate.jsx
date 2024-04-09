import React, { useState } from "react";
import supabase from "../utils/clients";
import "bootstrap/dist/css/bootstrap.css";

const CreateCrewmate = () => {
  const initialState = {
    name: "",
    role: "",
    specialty: "",
    experiencelevel: "",
    status: "",
    category: "",
    description: "",
  };

  const [post, setPost] = useState(initialState);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const createPost = async (event) => {
    event.preventDefault();

    if (!Object.values(post).every((field) => field)) {
      alert("Please fill out all required fields");
      return;
    }

    try {
      await supabase.from("crewmates").insert([post]);
      setShowSuccessMessage(true);
      setPost(initialState);
    } catch (error) {
      console.error("Error creating crewmate:", error.message);
    }
  };

  const roleOptions = [
    { value: "1", label: "Role 1" },
    { value: "2", label: "Role 2" },
    { value: "3", label: "Role 3" },
  ];

  const categoryOptions = [
    { value: "category1", label: "Category 1" },
    { value: "category2", label: "Category 2" },
    { value: "category3", label: "Category 3" },
  ];

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

                {Object.entries(post).map(([fieldName, fieldValue]) => (
                  <div key={fieldName} className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                    </span>
                    {fieldName === "description" ? (
                      <textarea
                        className="form-control"
                        id={fieldName}
                        name={fieldName}
                        value={fieldValue}
                        onChange={handleChange}
                        aria-label="With textarea"
                      ></textarea>
                    ) : fieldName === "role" ? (
                      <select
                        className="form-select"
                        id={fieldName}
                        name={fieldName}
                        value={fieldValue}
                        onChange={handleChange}
                        aria-label={fieldName}
                        required
                      >
                        <option value="">Choose...</option>
                        {roleOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : fieldName === "category" ? (
                      <select
                        className="form-select"
                        id={fieldName}
                        name={fieldName}
                        value={fieldValue}
                        onChange={handleChange}
                        aria-label={fieldName}
                        required
                      >
                        <option value="">Choose...</option>
                        {categoryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={
                          fieldName === "experiencelevel" ? "number" : "text"
                        }
                        className="form-control"
                        id={fieldName}
                        name={fieldName}
                        value={fieldValue}
                        onChange={handleChange}
                        aria-label={fieldName}
                        aria-describedby="basic-addon1"
                        required
                      />
                    )}
                  </div>
                ))}
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
