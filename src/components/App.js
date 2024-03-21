import React from "react";
class App extends React.Component {
    static id = 0;

    constructor(props) {
        super(props);
        this.state = {
            items: [
                {text: "Learn JavaScript", isChecked: false, id: 1},
                {text: "Learn React", isChecked: false, id: 2},
                {text: "Play around in JSFiddle", isChecked: true, id: 3},
                {text: "Build something awesome", isChecked: true, id: 4}
            ]
        };
        this.id = 5;
        this.state.filter = '';
        this.addItem = this.addItem.bind(this);
        this.delete = this.delete.bind(this);
    }

    addItem() {
        const newItem = {id: this.id++, text: "New task", isChecked: false};
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
                        this.inFilter(item.text) ?
                        <li key={item.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={item.isChecked}
                                    onChange={() => this.toggle(item.id)}
                                />
                                <input
                                    type="text"
                                    value={item.text}
                                    className={item.isChecked ? "done" : ""}
                                    id={item.id}
                                    onChange={e => this.handleEdit(item.id, e.target.value)}
                                    disabled={item.isChecked}
                                />
                                <button
                                    type="button"
                                    onClick={() => this.delete(item.id)}>
                                    Supprimer
                                </button>
                            </label>
                        </li> :
                            null
                    ))}
                </ol>
                <footer>
                    <button onClick={this.addItem}>+</button>
                    <h2>Filtrer</h2>
                    <input
                        type="text"
                        onChange={e => this.handleFilter(e.target.value)}
                    />
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

    toggle(itemId) {
        this.setState(prevState => ({
            items: prevState.items.map(item =>
                item.id === itemId ? {...item, isChecked: !item.isChecked} : item
            )
        }));
    }

    delete(itemId) {
        this.setState(prevState => ({
            items: prevState.items.filter(item => item.id !== itemId)
        }));
    }

    count(isChecked = true) {
        let counter = 0;
        for (let i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i].isChecked === isChecked) {
                counter++;
            }
        }
        return counter;
    }

    handleFilter(filter) {
        this.setState( ({
            filter: filter
        }));
    }

   inFilter(text) {
    if(this.state.filter === '') {
        return true;
    }
    return text.toLowerCase().includes(this.state.filter.toLowerCase())
}
}

export default App;