import React from "react";
import "./App.css";
import { PotreeViewer, SideToolBar } from "./components";

function App() {
  return (
    <div
      className="potree_container"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
      }}
    >
      <PotreeViewer cloudUrl={"http://5.9.65.151/mschuetz/potree/resources/pointclouds/helimap/360/MLS_drive1/cloud.js"} />
      <SideToolBar />
    </div>
  );
}

export default App;
