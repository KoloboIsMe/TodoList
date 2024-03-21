import React from "react";
class App extends React.Component {
    static id = 0;

    constructor(props) {
        super(props);
        this.state = {
            items: [
                {text: "Learn JavaScript", done: false, id: 1},
                {text: "Learn React", done: false, id: 2},
                {text: "Play around in JSFiddle", done: true, id: 3},
                {text: "Build something awesome", done: true, id: 4}
            ]
        };
        this.id = 5;
        this.addItem = this.addItem.bind(this);
        this.delete = this.delete.bind(this);
    }

    addItem() {
        const newItem = {id: this.id++, text: "New task", done: false};
        this.setState(prevState => ({
            items: [...prevState.items, newItem]
        }));
    }

    render() {

        return (
            <div>
                <header>
                    <p>TO-DOs : {this.count(false) + '/' + this.state.items.length}</p>*
                </header>
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
                <footer>
                    <button onClick={this.addItem}>+</button>
                </footer>
            </div>
        );
    }

    handleEdit(itemId, newText) {
        this.setState(prevState => ({
            items: prevState.items.map(item =>
                item.id === itemId ? {...item, text: newText} : item
            )
        }));
    }

    toggleDone(itemId) {
        this.setState(prevState => ({
            items: prevState.items.map(item =>
                item.id === itemId ? {...item, done: !item.done} : item
            )
        }));
    }

    delete(itemId) {
        this.setState(prevState => ({
            items: prevState.items.filter(item => item.id !== itemId)
        }));
    }

    count(done = true) {
        let counter = 0;
        for (let i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i].done === done) {
                counter++;
            }
        }
        return counter;
    }
}

export default App;