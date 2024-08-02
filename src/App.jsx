import React, { useState } from "react";
import "./App.css";
import { PotreeViewer, SideToolBar } from "./components";

const POINT_CLOUDS = [
  "http://5.9.65.151/mschuetz/potree/resources/pointclouds/helimap/360/MLS_drive1/cloud.js",
  "http://5.9.65.151/mschuetz/potree/resources/pointclouds/helimap/epalinges/als_converted/cloud.js",
  "http://5.9.65.151/mschuetz/potree/resources/pointclouds/archpro/heidentor/cloud.js",
];

function App() {
  const [cloudUrl, setCloudUrl] = useState(POINT_CLOUDS[0]);

  const onChangePointCloud = (target) => {
    const currentIndex = POINT_CLOUDS.findIndex((url) => url === cloudUrl);
    if (currentIndex === 0 && target === -1) {
      setCloudUrl(POINT_CLOUDS[POINT_CLOUDS.length]);
    } else if (currentIndex === POINT_CLOUDS.length && target === 1) {
      setCloudUrl(POINT_CLOUDS[0]);
    }
    setCloudUrl(POINT_CLOUDS[currentIndex + target]);
  };
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
      <PotreeViewer cloudUrl={cloudUrl} />
      <SideToolBar />
      <div className="potree_controls">
        <button onClick={() => onChangePointCloud(-1)}>Back</button>
        <button onClick={() => onChangePointCloud(1)}>Next</button>
      </div>
    </div>
  );
}

export default App;
