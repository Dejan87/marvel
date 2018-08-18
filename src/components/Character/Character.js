import React from "react";

import classes from "./Character.css";

const character = (props) => (
    <div className={classes.Row + " col-md-3 col-sm-6 col-xs-12"}>
        <div className={classes.Image}>
            <img src={props.path} alt="Marvel Character" />
        </div>
        <div className={classes.Name}>
            <p>{props.name}</p>
        </div>
    </div>
);

export default character;