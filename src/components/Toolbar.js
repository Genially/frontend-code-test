import React from "react";

function Toolbar() {
  return (
    <div className="toolbar">
      <button>Add Box</button>
      <button>Remove Box</button>
      <input type="color" />
      <span>No boxes selected</span>
    </div>
  );
}

export default Toolbar;
