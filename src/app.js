import { useState, useEffect } from "react";
import * as Icon from 'react-bootstrap-icons';
import './style.scss';
import { slides } from './data';

export default function Carousel() {

  let [counter, setCounter] = useState(0);
  let [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    setSlideWidth(document.querySelector(".slideshow-wrapper").clientWidth);
  }, []);

  const goBack = () => { counter === 0 ? setCounter(0) : setCounter(--counter); };
  const goForward = () => { counter === slides.length - 1 ? setCounter(slides.length - 1) : setCounter(++counter); };

  const dragDown = (e) => {

    let slides = document.querySelector(".slides");
    slides.addEventListener("mousemove", moveElement);
    slides.addEventListener("touchmove", moveElement);
    slides.addEventListener("mouseup", cancelDrag);
    slides.addEventListener("touchend", cancelDrag);

    let startPos, currentPos;
    startPos = e.clientX || e.touches[0].clientX;
    let offSet = slides.offsetLeft;

    function moveElement(e) {
      currentPos = e.clientX || e.touches[0].clientX;
      slides.style.transition = "0s";
      slides.style.left = offSet - (startPos - currentPos) + "px";
    };

    function cancelDrag() {
      slides.style.transition = "1s";
      startPos > currentPos ? goForward() : goBack();
      console.log(counter);
      slides.removeEventListener("mousemove", moveElement);
      slides.removeEventListener("touchmove", moveElement);
    };
  };

  return (
    <div className="slideshow py-4">
      <h1 className="header ls-1 mb-2">Slideshow</h1>
      <p className="text-center">A slideshow that works with a mouse and touchscreens</p>
      <div
        className="slideshow-wrapper position-relative overflow-hidden w-75 mx-auto"
        style={{ height: "30em" }}
      >
        <div 
          className="slides position-absolute w-100 h-100 row flex-nowrap m-0"
          style={{ left: - (slideWidth * counter) + 'px' }}
        >
          {
            slides.map((item, index) => {
              return (
                <div
                  key={index}
                  className={"slide h-100 bg-cover centered"}
                  style={{ backgroundImage: "url(" + item.picture + ")", width: slideWidth + 'px' }}
                  onMouseDown={dragDown}
                  onTouchStart={dragDown}
                >
                  <div className="w-50 p-3 fw-bold text-dark bg-light text-center city-name">{item.name}</div>
                </div>
              );
            })
          }
        </div>
        <div className="dots d-flex position-absolute w-100 justify-content-center">
          {
            slides.map((item, index) => {
              return (
                <div 
                  key={index} 
                  className={"dot rounded-circle bg-white mx-2" + (counter === index ? " active" : "")}
                  onClick={() => {
                    setCounter(index);
                  }}
                ></div>
              )
            })
          }
        </div>
        <div className="">
          <button
            type="button"
            className="btn btn-prev position-absolute h-100"
            onClick={() => { goBack() }}
          >
            <Icon.CaretLeftFill className="w-100 h-100" />
          </button>
          <button
            type="button"
            className="btn btn-next position-absolute h-100"
            onClick={() => { goForward() }}
          >
            <Icon.CaretRightFill className="w-100 h-100" />
          </button>
        </div>
      </div>
    </div>
  );
};