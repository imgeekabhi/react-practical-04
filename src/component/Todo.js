import React, { useState, useEffect } from "react";
import "../component/Todo.css";
import CurrentDate from "./CurrentDate";
import CurrentMonth from "./CurrentMonth";
import CurrentYear from "./CurrentYear";
import Weekday from "./Weekday";
const schedule = require("node-schedule");

//get data from local storage
const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const [show, setShow] = useState(false);
  const addItem = () => {
    if (!inputData) {
      alert("Please enter the item...");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);

      setInputData("");

      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };
  const handleChangeTextColor = (id) => {
    let updateTextColor = items.map((elem) => {
      if (elem.id === id) {
        elem.isComplete = !elem.isComplete;
      }
      return elem;
    });
    setItems(updateTextColor);
  };
  // to delete the items
  const deleteItem = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });

    setItems(updatedItems);
  };

  //automatically clear list in 24hrs
  //"*/10 * * * * *"
  schedule.scheduleJob("0 0 * * *", () => {
    setItems([]);
  });
  // to add data local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  //on press enter button
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addItem();
      console.log("do validate");
    }
  };
  // onPress escape button
  const handleEscapeKeyDown = (event) => {
    if (event.key === "Escape") {
      document.getElementById("add-btn").style.visibility = "visible";
      document.getElementById("add-items").style.display = "none";
      setShow(!show);
      console.log("escape presses...");
    }
  };
  return (
    <>
      <div className="parent-div">
        <div className="main-div">
          <div className="card">
            <div className="child-div">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="week-day">
                      <div className="container">
                        <div className="row">
                          <div className="col current-date pr-0">
                            <CurrentDate />
                          </div>
                          <div className="col current-month-year ml-2 mt-3 pl-4">
                            <div className="row current-month">
                              <CurrentMonth />
                            </div>
                            <div className="row current-year">
                              <CurrentYear />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="week-day mt-4">
                      <Weekday />
                    </div>
                  </div>
                </div>
              </div>

              <div className="showItems">
                {items.map((elem) => {
                  return (
                    <div className="eachItem" key={elem.id}>
                      <h3
                        className={
                          elem.isComplete ? "todo-row text_color" : "todo-row"
                        }
                      >
                        {elem.name}
                      </h3>
                      <div className="todo-btn">
                        <i>
                          <div className="checkbox pr-5 mt-2">
                            <input
                              type="checkbox"
                              id="myCheck"
                              onClick={() => handleChangeTextColor(elem.id)}
                            />
                          </div>
                        </i>
                        <i
                          className="far fa-trash-alt add-btn"
                          title="Delete Your Item"
                          onClick={() => deleteItem(elem.id)}
                        ></i>
                      </div>
                    </div>
                  );
                })}
              </div>
              {show ? (
                <div id="add-items" className="addItems">
                  <input
                    type="text"
                    placeholder="Add your items here..."
                    value={inputData}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleEscapeKeyDown}
                    onChange={(e) => setInputData(e.target.value)}
                  />
                  {toggleSubmit ? (
                    <i
                      className="fa fa-plus-square"
                      title="Add Your Item"
                      onClick={addItem}
                    ></i>
                  ) : (
                    {}
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            id="add-btn"
            type="button"
            className="fa fa-plus mt-5 "
            onClick={() => {
              setShow(!show);
              document.getElementById("add-btn").style.visibility = "hidden";
            }}
          ></button>
        </div>
      </div>
    </>
  );
};

export default Todo;
