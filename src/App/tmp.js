class Task {
    constructor(id) {
        this.id = id;
        this.label = "New task";
        this.done = false;
        this.dueDate = '';
    }
    toggleDone() {
        this.setState(prevState => ({
            items: prevState.items.map(item =>
                item.id === this.id ? { ...item, done: !item.done } : item
            )
        }));
    }
    edit(label) {
        this.label = label;
    }
    render() {
        return (<li key={this.id}>
                <label>
                    <input
                        type="checkbox"
                        checked={this.done}
                        onChange={() => this.toggleDone(this.id)}
                    />
                    <input
                        type="text"
                        value={this.text}
                        className={this.done ? "done" : ""}
                        id={this.id}
                        onChange={e => this.edit(e.target.value)}
                        disabled={this.done}
                    />
                    <button
                        type="button"
                        onClick={() => this.delete(this.id)}>
                        Supprimer
                    </button>
                </label>
            </li>
        );
    }
}

// eslint-disable-next-line no-undef
class TodoApp extends React.Component {
    static id = 0;
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { text: "Learn JavaScript", 				done: false,	id: 1},
                { text: "Learn React", 							done: false,  id: 2},
                { text: "Play around in JSFiddle", 	done: true,  	id: 3},
                { text: "Build something awesome", 	done: true,  	id: 4}
            ]
        };
        this.id = 5;
        this.addItem = this.addItem.bind(this);
        this.delete = this.delete.bind(this);
    }

    addItem() {
        const newItem = { id: this.id++, text: "New task", done: false };
        this.setState(prevState => ({
            items: [...prevState.items, newItem]
        }));
    }

    render() {
        let tasks = this.countTasks();
        if(tasks == 0 ) {
            tasks = "All done";
        } else if (tasks == 1) {
            tasks += ' task'
        } else {
            tasks += ' tasks'
        }
        return (
            <div>
                <button onClick={this.addItem}>+</button>
                <p>Total items: {this.state.items.length}</p>
                <h2>Todos: {tasks}</h2>
                <ol>
                    {this.state.items.map(item => (
                        <li key={item.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={item.done}
                                    onChange={() => this.toggleDone(item.id)}
                                />
                                <input
                                    type="text"
                                    value={item.text}
                                    className={item.done ? "done" : ""}
                                    id={item.id}
                                    onChange={e => this.handleEdit(item.id, e.target.value)}
                                    disabled={item.done}
                                />
                                <button
                                    type="button"
                                    onClick={() => this.delete(item.id)}>
                                    Supprimer
                                </button>
                            </label>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }

    countTasks() {
        return this.state.items.filter(item => !item.done).length;
    }


    handleEdit(itemId, newText) {
        this.setState(prevState => ({
            items: prevState.items.map(item =>
                item.id === itemId ? { ...item, text: newText } : item
            )
        }));
    }

    toggleDone(itemId) {
        this.setState(prevState => ({
            items: prevState.items.map(item =>
                item.id === itemId ? { ...item, done: !item.done } : item
            )
        }));
    }

    delete(itemId) {
        this.setState(prevState => ({
            items: prevState.items.filter(item => item.id !== itemId)
        }));
    }


    countUndone() {
        let counter = 0;
        for(let i = 0; i < this.state.items.length; i++) {
            if(!this.state.items[i].done) {
                counter++;
            }
        }
        return counter;
    }

}

ReactDOM.render(<TodoApp />, document.querySelector("#app"));