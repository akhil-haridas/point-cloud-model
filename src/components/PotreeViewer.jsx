import React, { useEffect, useRef, useCallback } from "react";

const Potree = window.Potree;

const PotreeViewer = ({ cloudUrl }) => {
  const potreeContainerDiv = useRef(null);

  const initializeViewer = useCallback(() => {
    if (potreeContainerDiv.current) {
      const viewerElem = potreeContainerDiv.current;
      const viewer = new Potree.Viewer(viewerElem);

      viewer.setEDLEnabled(true);
      viewer.setFOV(60);
      viewer.setPointBudget(1 * 1000 * 1000);
      viewer.setClipTask(Potree.ClipTask.SHOW_INSIDE);
      viewer.loadSettingsFromURL();

      viewer.setControls(viewer.orbitControls);

      viewer.loadGUI(() => {
        viewer.setLanguage("en");
        viewer.toggleSidebar();
      });

      const url = cloudUrl || "http://5.9.65.151/mschuetz/potree/resources/pointclouds/helimap/360/MLS_drive1/cloud.js";

      Potree.loadPointCloud(url)
        .then((e) => {
          const pointcloud = e.pointcloud;
          const material = pointcloud.material;

          material.activeAttributeName = "rgba";
          material.minSize = 2;
          material.pointSizeType = Potree.PointSizeType.FIXED;

          viewer.scene.addPointCloud(pointcloud);

          viewer.fitToScreen();

          console.log("This is the url", url);
        })
        .catch((e) => console.error("ERROR: ", e));
    }
  }, [cloudUrl]);

  useEffect(() => {
    initializeViewer();
  }, [initializeViewer]);

  return <div id="potree_render_area" ref={potreeContainerDiv}></div>;
};

export default React.memo(PotreeViewer);
