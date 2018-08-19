import React from "react";

import classes from "./Bookmarks.css";
import Aux from "../../hoc/Auxiliary";

const bookmarks = (props) => {
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
            <div>
                <p onClick={() => props.remove(bookmark.id)} className={classes.Status}>Do you really want to remove me from your bookmarks? :(</p>
            </div>
        </div>
    );

    return (
        <Aux>
            <div className={classes.BookmarkTitle}>
                <h2>My Bookmarks</h2>
            </div>
            {showBookmarks}
        </Aux>
    );
};

export default bookmarks;