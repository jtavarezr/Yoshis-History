import React, { useState, useEffect } from "react";
import supabase from "../utils/clients";
import { TypeColors } from "../utils/TypeColors";
import Card from "../components/Cards";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

const ReadPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await supabase
        .from("crewmates")
        .select()
        .order("experiencelevel", { ascending: false });

      setPosts(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching crewmates");
      console.error("Error fetching crewmates:", error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <br />
        <h1>All Pleayer</h1>
        <div className="row">
          {loading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="col-sm-6">
                <div className="card mb-4 box-shadow">
                  <Card
                    id={post.id}
                    name={post.name}
                    role={post.role}
                    specialty={post.specialty}
                    experiencelevel={post.experiencelevel}
                    description={post.description}
                    likesCount={post.likesCount}
                    image={`/${post.category}.jpg`}
                    speed={post.speed}
                    defense={post.defense}
                    attack={post.attack}
                    category={post.category}
                    TypeColors={TypeColors}
                  />
                </div>
              </div>
            ))
          ) : (
            <h2>{"There's No Players Yet 😞"}</h2>
          )}
        </div>
      </div>

      <BarChart
        width={1000}
        height={300}
        data={posts.map((post) => ({
          name: post.name,
          experiencelevel: post.experiencelevel,
        }))}
        margin={{
          top: 5,
          right: 30,
          left: -30,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="experiencelevel" fill="#8884d8" minPointSize={5}>
          <LabelList dataKey="name" content={renderCustomizedLabel} />
        </Bar>
      </BarChart>
    </>
  );
};
export default ReadPost;

const renderCustomizedLabel = (props) => {
  const { x, y, width, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};