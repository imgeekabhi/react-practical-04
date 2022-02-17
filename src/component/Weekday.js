import React, { Component } from "react";

export default class Weekday extends Component {
  render() {
    const day = new Date().getDay();
    let str = "";
    switch (day) {
      case 0:
        str = "SUNDAY";
        break;
      case 1:
        str = "MONDAY";
        break;
      case 2:
        str = "TUESDAY";
        break;
      case 3:
        str = "WEDNESDAY";
        break;
      case 4:
        str = "THURSDAY";
        break;
      case 5:
        str = "FRIDAY";
        break;
      case 6:
        str = "SATURDAY";
        break;
      default:
        str = null;
        break;
    }
    return <div>{str}</div>;
  }
}
