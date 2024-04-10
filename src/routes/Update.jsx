import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import supabase from "../utils/clients";
import "bootstrap/dist/css/bootstrap.css";


const UpdateCrewmate = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        const { data, error } = await supabase
          .from("crewmates")
          .select()
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching crewmate:", error.message);
        } else {
          setPost(data);
        }
      } catch (error) {
        console.error("Error fetching crewmate:", error.message);
      }
    };

    fetchCrewmate();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const updateCrewmate = async (event) => {
    event.preventDefault();
    try {
      await supabase.from("crewmates").update(post).eq("id", id);
      setShowSuccessMessage(true);
      <Link to={'/'} />
    } catch (error) {
      console.error("Error updating crewmate:", error.message);
    }
  };

  const deleteCrewmate = async () => {
    try {
      await supabase.from("crewmates").delete().eq("id", id);
      setShowSuccessMessage(true);
      <Link to={"/"} />
    } catch (error) {
      console.error("Error deleting crewmate:", error.message);
    }
  };

  return (
    <>
      <br />
      <div className="create-crewmate">
        <h1>Edit Crewmate</h1>
      </div>

      <div>
        <form onSubmit={updateCrewmate}>
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Crewmate Attributes</h5>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Name
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={post.name || ""}
                    onChange={handleChange}
                    aria-label="Name"
                    required
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Role
                  </span>
                  <select
                    className="form-select"
                    name="role"
                    value={post.role || ""}
                    onChange={handleChange}
                    aria-label="Role"
                    required
                  >
                    <option value="">Choose...</option>
                    {[1, 2, 3].map((value) => (
                      <option key={value} value={value}>
                        Role {value}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    Experience
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="experiencelevel"
                    value={post.experiencelevel || ""}
                    onChange={handleChange}
                    aria-label="Experience"
                    required
                  />
                </div>

                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    Specialty
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="specialty"
                    value={post.specialty || ""}
                    onChange={handleChange}
                    aria-label="Specialty"
                    required
                  />
                </div>

                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    Category
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    value={post.category || ""}
                    onChange={handleChange}
                    aria-label="Category"
                    required
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Description
                  </span>
                  <textarea
                    className="form-control"
                    name="description"
                    value={post.description || ""}
                    onChange={handleChange}
                    aria-label="Description"
                    required
                  />
                </div>
                {/* Mensaje emergente de éxito */}
                {showSuccessMessage && (
                  <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    Crewmate updated successfully!
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                      onClick={() => setShowSuccessMessage(false)}
                    ></button>
                  </div>
                )}
                <label>Likes: {post.likesCount}</label>
                <br />
                <label>Created: {post.dateadded}</label>
              </div>
            </div>
          </div>
          <input type="submit" value="Update" className="btn btn-primary" />{" "}
          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteCrewmate}
          >
            Delete
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateCrewmate;
