import { useState } from "react";
import "./App.css";
import TestConnection from "./utils/TestConnection";
import { Link, Outlet } from "react-router-dom";
import "./assets/crewmate.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main className="main">
        <aside className="sidebar">
          <nav className="nav">
            <ul>
              <li className="active">
                <a href="#">Welcome</a>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/create">Create New</Link>
              </li>
              <li>
                <Link to="/Test">Go To Test Page</Link>
              </li>
            </ul>
          </nav>
        </aside>

        <section className="twitter">
          <div className="container">
            <Outlet />
          </div>
        </section>
        <nav>
          <ul>
            <li className="home-link" key="home-button">
              <Link style={{ color: "white" }} to="/">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </>
  );
}

export default App;
