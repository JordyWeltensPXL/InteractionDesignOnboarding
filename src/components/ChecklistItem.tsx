import React from "react";

export const ChecklistItem = ({ text }) => {
  return (
    <div className="checklist-item">
      <li>{text}</li>
      <i className="fa-solid fa-check"></i>
    </div>
  );
};
