/* eslint-disable no-unused-vars */
import "./App.css";
import { useEffect, useRef } from "react";
import { Howl } from "howler";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import soundUrl from "./assets/hey_tay.mp3";
var sound = new Howl({
  src: [soundUrl],
});
// sound.play();

var start;

function App() {
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const video = useRef();

  const init = async () => {
    console.log("init...");

    await setUpCamera();

    console.log("setUp camera success");
  };

  const setUpCamera = () => {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          { video: true },
          (stream) => {
            video.current.srcObject = stream;
            video.current.addEventListener("loaddedata", resolve());
          },
          (error) => reject()
        );
      } else {
        reject();
      }
    });
  };

  return (
    <div className="main">
      <video ref={video} className="video" autoPlay />
      <div className="control">
        <button className="btn">Train 1</button>
        <button className="btn">Train 2</button>
        <button className="btn">Run</button>
      </div>
    </div>
  );
}

export default App;
