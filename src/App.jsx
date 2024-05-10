import { useState, useEffect } from "react";
import { ChecklistItem } from "./components/ChecklistItem";
import { useShepherdTour } from "react-shepherd";
import "shepherd.js/dist/css/shepherd.css";

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
    tour.start();
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
            <div className="grid-item item2">
              You don't seem to have any routes yet.
              <button className="button route-button">Add route</button>
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
    </>
  );
}

export default App;
