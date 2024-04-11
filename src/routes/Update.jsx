import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import supabase from "../utils/clients";
import "bootstrap/dist/css/bootstrap.css";
import RoleSelect from "../utils/RoleSelect";
import CategorySelect from "../utils/CategorySelect";


const UpdateCrewmate = () => {
    const initialState = {
      name: "",
      role: "",
      specialty: "",
      experiencelevel: "",
      category: "",
      description: "",
      status: false,
      image: "",
    };

  const { id } = useParams();
  const [post, setPost] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchCrewmate();
  }, [id]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (post.category && categories.length > 0) {
      updateImage("category", post.category);
    }
  }, [post.category, categories]);

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

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("category").select();
      if (error) {
        console.error("Error fetching categories:", error.message);
      } else {
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const updateImage = (name, value) => {
    if (name === "category" && value) {
      const selectedCategory = categories.find(
        (category) => category.category === value
      );
      setSelectedImage(selectedCategory ? selectedCategory.image : "");
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
        if (name === "category") {
          const selectedCategory = categories.find(
            (category) => category.category === value
          );
          setSelectedImage(selectedCategory ? selectedCategory.image : "");
        }
    setPost((prev) => ({ ...prev, [name]: value }));
  };


  const updateCrewmate = async (event) => {
    event.preventDefault();
    try {
      await supabase.from("crewmates").update(post).eq("id", id);
      setShowSuccessMessage(true);
      <Link to={"/"} />;
    } catch (error) {
      console.error("Error updating crewmate:", error.message);
    }
  };

  const deleteCrewmate = async () => {
    try {
      await supabase.from("crewmates").delete().eq("id", id);
      setShowSuccessMessage(true);
      <Link to={"/"} />;
    } catch (error) {
      console.error("Error deleting crewmate:", error.message);
    }
  };
  const roles = [
    "Boss",
    "Capitán",
    "Fighter",
    "Wizard",
    "Rogue",
    "Cleric",
    "Paladin",
    "Bard",
    "Ranger",
    "Engineer"
  ];

  return (
    <>
      <br />
      <div className="create-crewmate">
        <h1>Edit Crewmate</h1>
      </div>
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

      <form onSubmit={updateCrewmate}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Crewmate Attributes</h5>

            <div className="row mb-3 align-items-center">
              <div className="col-sm-6">
                <label htmlFor="name" className="form-label">
                  Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={post.name}
                  required
                  onChange={handleChange}
                />

                <CategorySelect
                  categories={categories}
                  value={post.category}
                  onChange={handleChange}
                />

                <RoleSelect value={post.role} onChange={handleChange} />

                <label htmlFor="category" className="form-label">
                  Team
                </label>
                <select
                  className="form-select"
                  id="category"
                  name="category"
                  value={post.category}
                  onChange={handleChange}
                  aria-label="Category"
                  required
                >
                  <option value="">Choose a Team...</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.category}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col">
                <div className="border rounded p-1">
                  <img
                    src={`/${selectedImage}`}
                    alt="Status Image"
                    style={{ height: "200px" }}
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="experiencelevel" className="form-label">
                    Experience
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="experiencelevel"
                    name="experiencelevel"
                    value={post.experiencelevel}
                    onChange={handleChange}
                    aria-label="Experience"
                    required
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="attack" className="form-label">
                    Attack
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="attack"
                    name="attack"
                    value={post.attack}
                    onChange={handleChange}
                    aria-label="Attack"
                    required
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="mb-3">
                  <label htmlFor="experiencelevel" className="form-label">
                    Defense
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="defense"
                    name="defense"
                    value={post.defense}
                    onChange={handleChange}
                    aria-label="Defence"
                    required
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="specialty" className="form-label">
                    Speed
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="speed"
                    name="speed"
                    value={post.speed}
                    onChange={handleChange}
                    aria-label="Speed"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={post.description}
                onChange={handleChange}
                aria-label="With textarea"
                required
              ></textarea>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="status"
                name="status"
                checked={post.status}
                onChange={() =>
                  setPost((prev) => ({ ...prev, status: !post.status }))
                }
              />
              <label className="form-check-label" htmlFor="status">
                Status
              </label>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <input type="submit" value="Update" className="btn btn-primary" />{" "}
          <div>
            <Link className="btn btn-primary" to="/list">
              Go To Gallery!
            </Link>
          </div>{" "}
          <div
            type="button"
            className="btn btn-danger"
            onClick={deleteCrewmate}
          >
            <Link to="/list">
              Delete
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateCrewmate;
