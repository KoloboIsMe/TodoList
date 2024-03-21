import React from "react";

/**
 * La représentation objet d'une tache
 */
class Task {
    /**
     * Constructeur qui initialise les attributs et stocke l'ID donné.
     * @param id
     */
    constructor(id) {
        this.id = id;
        this.label = "New task";
        this.isChecked = false;
        this.category = null;
    }

    /**
     * Change l'état de la tâche.
     */
    toggleDone() {
        this.isChecked = !this.isChecked;
    }

    /**
     * Change le label de la tâche.
     * @param label
     */
    edit(label) {
        this.label = label;
    }

    /**
     * Formatte la tâche.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <label>
                <input
                    type="checkbox"
                    checked={this.done}
                    onChange={() => this.toggleDone()}
                />
                <input
                    type="text"
                    value={this.label}
                    className={this.isChecked ? "done" : ""}
                    id={this.id}
                    onChange={e => this.edit(e.target.value)}
                    disabled={this.isChecked}
                />
            </label>
        );
    }
}

export default Task;