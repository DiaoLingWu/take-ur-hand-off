/* eslint-disable no-unused-vars */
import "./App.css";
import { useEffect, useRef } from "react";
import { Howl } from "howler";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import soundUrl from "./assets/hey_tay.mp3";
var sound = new Howl({
  src: [soundUrl],
});
// sound.play();

function App() {
  // const variable
  const NOT_TOUCH_MODULE = "not_touch";
  const TOUCHED = "touched";
  const TRAINING_TIMES = 50;
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const video = useRef();
  let classifierModule = useRef();
  let mobilenetModule = useRef();
  const init = async () => {
    console.log("init...");

    await setUpCamera();
    console.log("setUp camera success");

    classifierModule.current = knnClassifier.create();
    mobilenetModule.current = await mobilenet.load();

    console.log("set up done");
    console.log("Dont touch face and press Train 1 ");
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

  const train = async (label) => {
    for (let i = 0; i < TRAINING_TIMES; i++) {
      console.log(`Progress ${parseInt(((i + 1) / TRAINING_TIMES) * 100)}%`);
      await sleep(100);
    }
  };

  const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };
  return (
    <div className="main">
      <video ref={video} className="video" autoPlay />
      <div className="control">
        <button onClick={() => train(NOT_TOUCH_MODULE)} className="btn">
          Train 1
        </button>
        <button onClick={() => train(TOUCHED)} className="btn">
          Train 2
        </button>
        <button onClick={() => {}} className="btn">
          Run
        </button>
      </div>
    </div>
  );
}

export default App;
