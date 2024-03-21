import React from "react";

/**
 * Représente le header de l'application, composé d'une barre de progression
 */
class Header extends React.Component {
    constructor(props) {
        super(props);
        //TODO this
    }

    render() {
        // Accédez à taskListing à partir de l'instance de App
        const taskListing = this.props.app.taskListing;

        return (
            <header>
                <p>Total items: {taskListing.count(false) + '/' + taskListing.count(true)}</p>
            </header>
        );
    }
}

export default Header;