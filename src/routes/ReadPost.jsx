import React, { useState, useEffect } from "react";
import supabase from "../utils/clients";
import Card from "../components/Cards";

const ReadPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("crewmates")
      .select()
      .order("likesCount", { ascending: false });

    setPosts(data);
  };
  return (
    <>
      <div>
        <br />
        <h1>All Crewmate</h1>
        <div className="row">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="col-sm-4">
                <Card
                  id={post.id}
                  name={post.name}
                  role={post.role}
                  specialty={post.specialty}
                  experiencelevel={post.experiencelevel}
                  description={post.description}
                  likesCount={post.likesCount}
                />
              </div>
            ))
          ) : (
            <h2>{"No Crewmates Yet 😞"}</h2>
          )}
        </div>
      </div>
    </>
  );
};
export default ReadPost;
