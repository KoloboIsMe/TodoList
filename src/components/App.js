import React from "react";
import {v4 as uuidv4} from "uuid";
import { FaArrowUp, FaArrowDown, FaTrash } from 'react-icons/fa';

class App extends React.Component {
    static id = 0;

    constructor(props) {
        super(props);
        let data = localStorage.getItem('todo-data');
        if (data) {
            data = JSON.parse(data);
            if (!Array.isArray(data)) {
                data = [];
            }
        } else {
            data = [];
        }
        this.state = {
            tasks: data,
            filter: ''
        };
        this.id = this.state.tasks.length > 0 ? this.state.tasks[this.state.tasks.length - 1].id + 1 : 0;
        this.addItem = this.addItem.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        const data = localStorage.getItem('todo-data');
        if (data) {
            this.setState(JSON.parse(data));
        }
    }

    componentDidUpdate() {
        localStorage.setItem('todo-data', JSON.stringify(this.state));
    }

    addItem() {
        const newItem = {id: this.id++, text: "New task", isChecked: false};
        this.setState(prevState => {
            const tasks = [...prevState.tasks, newItem];
            localStorage.setItem('todo-data', JSON.stringify(tasks));
            return {tasks};
        });
    }

    searching() {
        return this.state.filter.length <= 3;
    }

    render() {
        return (
            <div>
                <header>
                    <p>TO-DOs : {this.searching() ? this.count(false) + '/' + this.state.tasks.length : "Filtrage en cours ..."}</p>
                </header>
                <ol>
                    {this.state.tasks.map(item => (
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
                                    <FaTrash
                                        onClick={() => this.delete(item.id)}>
                                        Supprimer
                                    </FaTrash>
                                    <FaArrowUp
                                        onClick={() => this.goUp(item.id)}>
                                        Up
                                    </FaArrowUp>
                                    <FaArrowDown
                                        onClick={() => this.goDown(item.id)}>
                                        Down
                                    </FaArrowDown>
                                </label>
                            </li>
                            : null
                    ))}
                </ol>
                <footer>
                    <button onClick={this.addItem}>+</button>
                    <h2>Filtrer</h2>
                    <input
                        type="text"
                        value={this.state.filter}
                        onChange={e => this.handleFilter(e.target.value)}
                    />
                </footer>
            </div>
        );
    }

    handleEdit(itemId, newText) {
        this.setState(prevState => {
            const tasks = prevState.tasks.map(item =>
                item.id === itemId ? {...item, text: newText} : item
            );
            localStorage.setItem('todo-data', JSON.stringify(tasks));
            return {tasks};
        });
    }

    toggle(itemId) {
        this.setState(prevState => {
            const tasks = prevState.tasks.map(item =>
                item.id === itemId ? {...item, isChecked: !item.isChecked} : item
            );
            localStorage.setItem('todo-data', JSON.stringify(tasks));
            return {tasks};
        });
    }

    delete(itemId) {
        this.setState(prevState => {
            const tasks = prevState.tasks.filter(item => item.id !== itemId);
            localStorage.setItem('todo-data', JSON.stringify(tasks));
            return {tasks};
        });
    }

    count(isChecked = true) {
        let counter = 0;
        for (let i = 0; i < this.state.tasks.length; i++) {
            if (this.state.tasks[i].isChecked === isChecked) {
                counter++;
            }
        }
        return counter;
    }

    handleFilter(filter) {
        this.setState(({
            filter: filter
        }));
    }

    inFilter(text) {
        if (this.state.filter === '' || this.state.filter.length <= 3) {
            return true;
        }
        return text.toLowerCase().includes(this.state.filter.toLowerCase())
    }

    goUp(id) {
        const tasks = [...this.state.tasks];
        const index = tasks.findIndex(task => task.id === id);
        if (index > 0) {
            [tasks[index - 1], tasks[index]] = [tasks[index], tasks[index - 1]];
            this.setState({tasks});
        }
    }

    goDown(id) {
        const tasks = [...this.state.tasks];
        const index = tasks.findIndex(task => task.id === id);
        if (index < tasks.length - 1) {
            [tasks[index + 1], tasks[index]] = [tasks[index], tasks[index + 1]];
            this.setState({tasks});
        }
    }
}

export default App;