import React from "react";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        //TODO thhis
    }

    render() {
        // TODO composer l'application avec le header, le listing, et le footer
        return (<footer>
            <button onClick={this.addItem}>+</button>
        </footer>);
    }

    addTask() {
        // TODO Ajouter une tache au TaskListing
    }

    filter(filter) {
        // TODO Filtrer l'affichage des tâches selon le filtre, opacifier la barre de progression du header,
        //  seulement si filter contient au moins trois caractères
    }
}

export default Footer;