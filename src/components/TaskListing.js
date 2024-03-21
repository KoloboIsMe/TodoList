import React from "react";
import Task from "./Task";

class TaskListing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [new Task(this)]
        };
    }

    render() {
        return (
            <div>
                <ol>
                    {this.state.items && this.state.items.map(item => ((
                        <li key={item.id}>
                            {item.render()}
                            <button onClick={() => this.deleteTask(item.id)}>
                                Supprimer
                            </button>
                        </li>
                    )))}
                </ol>
            </div>
        );
    }

    addTask() {
        this.setState(prevState => ({
            items: [...prevState.items, new Task(this)]
        }));
    }

    deleteTask(id) {
        this.setState(prevState => ({
            items: prevState.items.filter(item => item.id !== id)
        }));
    }

    count(done = true) {
        let counter = 0;
        for (let i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i].isChecked === done) {
                counter++;
            }
        }
        return counter;
    }
}

export default TaskListing;