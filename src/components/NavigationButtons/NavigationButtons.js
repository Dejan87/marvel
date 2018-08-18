import React from "react";

import classes from "./NavigationButtons.css";

const navigationButtons = (props) => (
    <div className={classes.Navigation}>
        <button onClick={props.prevClick} disabled={props.prevDisabled ? "disabled" : ""}>Previous</button>
        Page:<span className={classes.PageNumber}>{props.currentPage}</span>
        <button onClick={props.nextClick} disabled={props.nextDisabled ? "disabled" : ""}>Next</button>
    </div>
);

export default navigationButtons;