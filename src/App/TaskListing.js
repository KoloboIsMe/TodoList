import React from "react";
import Task from "./Task";
import ReactDOM from "react-dom";

class TaskListing extends React.Component {
    static id = 0;

    constructor(props) {
        super(props);

        // TODO Import tasks

        this.state = {
            items: [new Task(TaskListing.id++)]
        };

        // Lancement de l'application
        ReactDOM.render(<TaskListing/>, document.querySelector("#root"));
    }

    render() {
        return (
            <div>
                <ol>
                    {this.state.items.map(item => ((
                        <li key={item.id}>
                            {item.render()}
                            <button
                                type="button"
                                onClick={() => this.deleteTask(item.id)}>
                                Supprimer
                            </button>
                        </li>
                    )))}
                </ol>
            </div>
        );
    }

    addTask() {
        this.items += new Task(this.id++);
    }

    deleteTask(id) {
        this.setState(prevState => ({
            items: prevState.items.filter(item => item.id !== id)
        }));
    }

    count(done = true) {
        // TODO compter les tâches faites ou pas faites selon le paramètre
        let counter = 0;
        for (let i = 0; i < this.state.items.length; i++) {
            if (!this.state.items[i].done) {
                counter++;
            }
        }
        return counter;
    }
}

export default TaskListing;