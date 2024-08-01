import styled from 'styled-components';
import './App.css'
import React, { useRef, useEffect } from 'react';

const Wrapper = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
`;

const Potree = window.Potree;
console.log("Potree", Potree)
function App() {

  const potreeContainerDiv = useRef(null);

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
      const url = 'http://5.9.65.151/mschuetz/potree/resources/pointclouds/archpro/heidentor/cloud.js';

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
  }, []);

  return (
    <div id="potree-root">
      <Wrapper ref={potreeContainerDiv} className="potree_container">
        <div id="potree_render_area"></div>
      </Wrapper>
    </div>
  );
}

export default App
