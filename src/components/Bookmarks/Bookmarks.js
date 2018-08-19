import React from "react";

import classes from "./Bookmarks.css";
import Aux from "../../hoc/Auxiliary";

const bookmarks = () => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    
    let showBookmarks = bookmarks.map(bookmark => 
        <div key={bookmark.id} className="col-md-3 col-sm-6 col-xs-12">
            <div className={classes.Image}>
                <img src={bookmark.thumbnail.path + "/standard_fantastic." + bookmark.thumbnail.extension} alt="Marvel bookmarks" />
            </div>
            <div className={classes.Name}>
                <p>Name:  {bookmark.name}</p>
            </div>
            <div className={classes.Bookmark}>
                <p className={classes.Status}>{bookmark.status}</p>
            </div>
        </div>
    );

    return (
        <Aux>
            {showBookmarks}
        </Aux>
    );
};

export default bookmarks;