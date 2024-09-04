import { useState, useEffect } from "react";
import { ChecklistItem } from "./components/ChecklistItem";
import { useShepherdTour } from "react-shepherd";
import "shepherd.js/dist/css/shepherd.css";

function App() {
  const [welcome, setWelcome] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [routes, setRoutes] = useState([]); // State to manage the list of routes
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");

  // Example checkpoints; replace with actual data
  const checkpoints = [
    "Sunrise Cove",
    "Eagle's Nest Rock",
    "Whispering Rapids",
    "Serenity Bay",
    "Maple Grove",
    "Fisherman’s Point",
    "Willow Bend",
    "Riverside Falls",
    "Hidden Lagoon",
    "Paddler’s Haven",
    "Heron’s Landing",
    "Driftwood Cove",
  ];

  useEffect(() => {
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("show");
      }, index * 100); // Staggered effect
    });

    // Similarly, handle other elements
  }, []);

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
    tour.start();
  };

  const handleAddRouteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveRoute = () => {
    if (startPoint && endPoint) {
      // Ensure that startPoint and endPoint are not the same
      if (startPoint !== endPoint) {
        // Add the new route to the list
        setRoutes([...routes, { startPoint, endPoint }]);
        setIsModalOpen(false);
        setStartPoint(""); // Reset the start point
        setEndPoint(""); // Reset the end point
      } else {
        alert("Start and End points cannot be the same.");
      }
    } else {
      alert("Please select both a Start and End point.");
    }
  };

  const handleRemoveRoute = (index) => {
    // Create a new array without the route at the given index
    const newRoutes = routes.filter((_, i) => i !== index);
    setRoutes(newRoutes);
  };

  const tourOptions = {
    defaultStepOptions: {
      cancelIcon: {
        enabled: true,
      },
    },
    useModalOverlay: true,
  };

  const tourSteps = [
    {
      id: "tour-step1",
      attachTo: { element: ".active", on: "right" },
      buttons: [
        {
          classes: "shepherd-button-secondary",
          text: "Continue",
          type: "next",
        },
      ],
      classes: "popover",
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: "Dashboard",
      text: "You are currently on the dashboard of our App. Here, you have a clear and quick overview of all the essential features.",
    },
    {
      id: "tour-step2",
      attachTo: { element: ".routes", on: "right" },
      buttons: [
        {
          classes: "shepherd-button-primary",
          text: "Back",
          type: "back",
        },
        {
          classes: "shepherd-button-secondary",
          text: "Continue",
          type: "next",
        },
      ],
      classes: "popover",
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: "Routes",
      text: "For a more detailed insight into your routes, you can always visit the 'Routes' section.",
    },
    {
      id: "tour-step3",
      attachTo: { element: ".more", on: "right" },
      buttons: [
        {
          classes: "shepherd-button-primary",
          text: "Back",
          type: "back",
        },
        {
          classes: "shepherd-button-secondary",
          text: "Continue",
          type: "next",
        },
      ],
      classes: "popover",
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: "Learn More",
      text: "Should you require further information, this section is always available to you.",
    },
    {
      id: "tour-step4",
      attachTo: { element: ".route-button", on: "bottom" },
      advanceOn: { selector: ".route-button", event: "click" },
      buttons: [
        {
          classes: "shepherd-button-primary",
          text: "Back",
          type: "back",
        },
        {
          classes: "shepherd-button-secondary",
          text: "End tour",
          type: "next",
        },
      ],
      classes: "popover",
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: "Create a Route",
      text: "It seems you haven't created any routes yet. Let's start by creating your first route now!",
    },
  ];

  const tour = useShepherdTour({ tourOptions, steps: tourSteps });

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <p className="logo">HikeHub</p>
          <ul className="links">
            <li className="link active">
              <i className="fa-solid fa-house"></i> Dashboard
            </li>
            <li className="link routes">
              <i className="fa-solid fa-route"></i> Routes
            </li>
            <li className="link">
              <i className="fa-solid fa-star"></i> Highlights
            </li>
            <li className="link">
              <i className="fa-solid fa-heart"></i> Favorites
            </li>
            <li className="link">
              <i className="fa-solid fa-chart-line"></i> Analytics
            </li>
            <li className="link">
              <i className="fa-solid fa-cog"></i> Settings
            </li>
            <li className="link more">
              <i className="fa-solid fa-circle-info"></i> Learn More
            </li>
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
                <ChecklistItem text={"Add a new kano route"}></ChecklistItem>
                <ChecklistItem
                  text={"Customize route preferences"}
                ></ChecklistItem>
                <ChecklistItem
                  text={"Set a paddling milestone"}
                ></ChecklistItem>
                <ChecklistItem text={"Plan a kano trip"}></ChecklistItem>
              </ul>
            </div>
            <div
              className={`grid-item item2 ${
                routes.length > 0 ? "has-routes" : ""
              }`}
            >
              {routes.length === 0 ? (
                <>
                  <p>You don't seem to have any routes yet.</p>
                  <button
                    className="button route-button"
                    onClick={handleAddRouteClick}
                  >
                    Add route
                  </button>
                </>
              ) : (
                <ul className="routes-list">
                  {routes.map((route, index) => (
                    <li key={index} className="route-card">
                      <h3>
                        from {route.startPoint} to {route.endPoint}
                        <button
                          className="remove-button"
                          onClick={() => handleRemoveRoute(index)}
                        >
                          &times;{" "}
                          {/* Unicode for multiplication sign, commonly used for 'x' */}
                        </button>
                      </h3>
                    </li>
                  ))}
                </ul>
              )}
              <button
                className="button route-button"
                onClick={handleAddRouteClick}
              >
                Add route
              </button>
            </div>
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
      {isModalOpen && (
        <>
          <div className="modal-overlay"></div>
          <div className="modal">
            <div className="modal-content">
              <h2>Add a New Route</h2>
              <div className="form-group">
                <label htmlFor="startPoint">Starting Point:</label>
                <select
                  id="startPoint"
                  value={startPoint}
                  onChange={(e) => setStartPoint(e.target.value)}
                >
                  <option value="">Select Starting Point</option>
                  {checkpoints.map((checkpoint, index) => (
                    <option key={index} value={checkpoint}>
                      {checkpoint}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="endPoint">Ending Point:</label>
                <select
                  id="endPoint"
                  value={endPoint}
                  onChange={(e) => setEndPoint(e.target.value)}
                >
                  <option value="">Select Ending Point</option>
                  {checkpoints.map((checkpoint, index) => (
                    <option key={index} value={checkpoint}>
                      {checkpoint}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-buttons">
                <button onClick={handleSaveRoute} className="button">
                  Save
                </button>
                <button onClick={handleCloseModal} className="button">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
