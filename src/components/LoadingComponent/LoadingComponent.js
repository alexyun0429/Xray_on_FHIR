import React, { useEffect, useRef } from "react";
import "./LoadingComponent.css";

const LoadingComponent = () => {
  // const canvasRef = useRef(null);
  // const MAX = 50;
  // let count = 0;
  // let points = [];

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   canvas.width = canvas.height = 400;
  //   ctx.fillRect(0, 0, 400, 400);

  //   var r = 0;
  //   for (var a = 0; a < MAX; a++) {
  //     points.push([Math.cos(r), Math.sin(r), 0]);
  //     r += (Math.PI * 2) / MAX;
  //   }

  //   for (var a = 0; a < MAX; a++) {
  //     points.push([0, points[a][0], points[a][1]]);
  //   }

  //   for (var a = 0; a < MAX; a++) {
  //     points.push([points[a][1], 0, points[a][0]]);
  //   }

  //   rus();

  //   function rus() {

  //     count++;
  //     requestAnimationFrame(rus);
  //   }
  // }, []);

  // return <canvas ref={canvasRef}></canvas>;
  <div class="ring">
    Loading
    <span></span>
  </div>;
};

export default LoadingComponent;
