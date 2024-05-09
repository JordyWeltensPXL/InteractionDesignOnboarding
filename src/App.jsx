import { useState, useEffect } from "react";
import { ChecklistItem } from "./components/ChecklistItem";

function App() {
  const [welcome, setWelcome] = useState(true);

  useEffect(() => {
    const containerDiv = document.querySelector(".container");
    if (containerDiv) {
      if (welcome) {
        containerDiv.classList.add("blur");
      } else {
        containerDiv.classList.remove("blur");
      }
    }
  }, [welcome]);

  const handleClick = () => {
    setWelcome(false);
  };

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <p className="logo">HikeHub</p>
          <ul className="links">
            <li className="link active">
              <i className="fa-solid fa-house"></i> Dashboard
            </li>
            <li className="link">Routes</li>
            <li className="link">Favorites</li>
            <li className="link">Learn More</li>
            <li className="link">Routes</li>
            <li className="link">Favorites</li>
            <li className="link">Learn More</li>
          </ul>
        </div>
        <div className="dashboard">
          <div className="dashboard-nav">Dashboard</div>
          <div className="grid">
            <div className="grid-item">
              <p className="subtitle">Getting Started</p>
              <p className="message">
                Here are some steps you can take to get started in the software
              </p>
              <ul className="checklist">
                <ChecklistItem text={"Add an account"}></ChecklistItem>
                <ChecklistItem text={"Customize categories"}></ChecklistItem>
                <ChecklistItem text={"Create a goal"}></ChecklistItem>
                <ChecklistItem text={"Create a budget"}></ChecklistItem>
              </ul>
            </div>
            <div className="grid-item item2">Recente routes</div>
            <div className="grid-item">Favorieten</div>
            <div className="grid-item"></div>
          </div>
        </div>
      </div>
      {welcome && (
        <div className="welcome-modal">
          <div className="circle"></div>
          <p className="modal-title">
            Welcome to <span>HikeHub!</span>
          </p>
          <p className="modal-subtitle">
            Hello there! We're thrilled to have you on board. Dive into a world
            where opportunities are endless, and your journey is just beginning.
          </p>
          <button onClick={handleClick} className="button">
            Take a Quick Tour
          </button>
        </div>
      )}
    </>
  );
}

export default App;
