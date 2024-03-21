import React from "react";
import {v4 as uuidv4} from "uuid";

class Task{
    constructor(listing) {
        this.listing = listing;
        this.id = uuidv4();
        this.label = "New task";
        this.isChecked = false;
    }

    update() {
        // Mettre à jour le TaskListing
        this.listing.setState(prevState => ({
            items:[this]
        }));
    }

    toggleDone() {
        this.isChecked = !this.isChecked;
        this.update();
    }

    edit(label) {
        this.label = label;
        this.update();
    }

    render() {
        return (
            <label>
                <input
                    type="checkbox"
                    checked={this.isChecked}
                    onChange={this.toggleDone()}
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

