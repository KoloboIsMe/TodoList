import React from "react";
import TaskListing from "./TaskListing";

class Footer extends React.Component {
    render() {
        return (<footer>
            {/*<button onClick={this.addTask}>+</button>*/}
        </footer>);
    }

    addTask() {
        TaskListing.instance.addTask()
    }
}

export default Footer;