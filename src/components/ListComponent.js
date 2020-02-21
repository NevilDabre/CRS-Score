import React, { useEffect, useState } from "react";
import "./ListComponent.scss";
import crsScoreData from "./crsScore.json";

let items = document.querySelectorAll(".timeline li");

function callbackFunc() {
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      if (!items[i].classList.contains("in-view")) {
        items[i].classList.add("in-view");
      }
    } else if (items[i].classList.contains("in-view")) {
      items[i].classList.remove("in-view");
    }
  }
}

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const ListComponent = () => {
  const [Cards, setCards] = useState();
  useEffect(() => {
    window.addEventListener("load", callbackFunc);
    window.addEventListener("scroll", callbackFunc);
    return () => {};
  }, []);

  useEffect(() => {
    const crsScoreDataReversed = crsScoreData.reverse();
    let CardsEntity = crsScoreDataReversed.map(
      (
        { id, number_of_invitations_issued, date_of_round, crs_score },
        index
      ) => {
        return (
          <li key={index}>
            <div>
              <time>#{id}</time>
              <div className="discovery">
                <h1>CRS Score: {crs_score}</h1>
                <p>
                  <strong>
                    Total invitations: {number_of_invitations_issued}
                  </strong>
                  <br />
                  <strong>Date: {date_of_round}</strong>
                </p>
              </div>
            </div>
          </li>
        );
      }
    );

    setCards(CardsEntity);
    items = document.querySelectorAll(".timeline li");
  }, []);

  useEffect(() => {}, [Cards]);

  return (
    <>
      <div className="heading">
        <div className="start">
          <p className="title">Latest</p>
        </div>
      </div>
      <section className="timeline">
        <ul>{Cards}</ul>
      </section>
      <div className="heading">
        <div className="start">
          <p className="title">Oldest</p>
        </div>
      </div>
    </>
  );
};

export default ListComponent;
