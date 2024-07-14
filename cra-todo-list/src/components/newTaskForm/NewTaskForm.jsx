import { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {

    constructor ({ onAddTask }) {
        super();

        this.state = {
            task: ''
        }

        this.onChangeHandler = (e) => {
            this.setState({
                task: e.target.value
            })
        }

        document.addEventListener('keyup', (e) => {
            if (e.code === 'Enter' && this.state.task) {
                onAddTask(this.state.task)
                this.setState({
                    task: ''
                })
            }
        })
    }

    render () {
        return (
            <input 
                className="new-todo" 
                placeholder="What needs to be done?"
                onChange={(e) => this.onChangeHandler(e)} 
                value={this.state.task}
                autofocus 
            />
        )
    }
    
}