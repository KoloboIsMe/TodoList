import '../style/App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import TaskListing from './TaskListing.js'
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * L'application, composée d'un Header, du listing des tâches, et d'un Footer.
 *
 * Singleton pour permettre à toute l'application d'y avoir accès.
 */
class App extends React.Component {
    constructor(props) {
        super(props);

        this.header = new Header({ app: this });
        this.taskListing = new TaskListing({ app: this });
        this.footer = new Footer({ app: this });
    }

    render() {
        let header = this.header.render();
        return (<div>
                {header}
                {this.taskListing.render()}
                {this.footer.render()}
        </div>);
    }
}

ReactDOM.render(<App/>, document.querySelector("#root"));
export default App;

