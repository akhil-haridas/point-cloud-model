import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css'

const POINT_CLOUDS = [
  "http://5.9.65.151/mschuetz/potree/resources/pointclouds/helimap/360/MLS_drive1/cloud.js",
  "http://5.9.65.151/mschuetz/potree/resources/pointclouds/archpro/heidentor/cloud.js",
  "http://5.9.65.151/mschuetz/potree/resources/pointclouds/opentopography/CA13_1.4/cloud.js",
  'http://5.9.65.151/mschuetz/potree/resources/pointclouds/opentopography/CA13_1.4/cloud.js'

]

const Wrapper = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

const Potree = window.Potree;

function App() {

  const potreeContainerDiv = useRef(null);
  const [target, setTarget] = useState(0);

  const onChangePointCloud = (number) => {
    const newTarget = target + number;
    console.log(newTarget)
    if (newTarget > POINT_CLOUDS.length || newTarget < 0) {
      setTarget(0);
    }
    setTarget(newTarget)
  }

  useEffect(() => {
    if (potreeContainerDiv.current) {
      // initialize Potree viewer
      const viewerElem = potreeContainerDiv.current;
      const viewer = new Potree.Viewer(viewerElem);

      viewer.setEDLEnabled(true);
      viewer.setFOV(60);
      viewer.setPointBudget(1 * 1000 * 1000);
      viewer.setClipTask(Potree.ClipTask.SHOW_INSIDE);
      viewer.loadSettingsFromURL();

      viewer.setControls(viewer.orbitControls);

      viewer.loadGUI(() => {
        viewer.setLanguage('en');
        document.getElementById("menu_appearance").nextElementSibling.style.display = 'block';
        viewer.toggleSidebar();
      });

      // Load and add point cloud to scene
      const url = POINT_CLOUDS[target];

      Potree.loadPointCloud(url).then(e => {
        const pointcloud = e.pointcloud;
        const material = pointcloud.material;

        material.activeAttributeName = "rgba";
        material.minSize = 2;
        material.pointSizeType = Potree.PointSizeType.FIXED;

        viewer.scene.addPointCloud(pointcloud);

        viewer.fitToScreen();

        console.log("This is the url", url);
      }).catch(e => console.error("ERROR: ", e));
    }
  }, [target]);

  return (
    <div id="potree-root">
      <Wrapper ref={potreeContainerDiv} className="potree_container">
        <div id="potree_render_area">
        </div>
      </Wrapper>
      <div className="potree_controls">
        <button onClick={() => onChangePointCloud(-1)}>Back</button>
        <button onClick={() => onChangePointCloud(1)}>Next</button>
      </div>
    </div>
  );
}

export default App
