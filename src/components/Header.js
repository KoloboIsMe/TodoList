import React from "react";
import TaskListing from "./TaskListing";

/**
 * Représente le header de l'application, composé d'une barre de progression
 */
class Header extends React.Component {
    render() {
        return (
            <header>
                {/*<p>Total items: {taskListing.count(false) + '/' + taskListing.count(true)}</p>*/}
            </header>
        );
    }
}

export default Header;