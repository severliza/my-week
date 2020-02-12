import React, {Component}  from 'react';
import './Todo.css';
import { getUserId } from '../../utils';

const headers = {
  'Content-type': 'application/json',
  Accept: 'application/json;charset=UTF-8',
  'Access-Control-Allow-Origin': '*',
}
const credentials = 'same-origin'

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: '' , 
      week: props.week,
      goals: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addGoal = this.addGoal.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  componentDidMount() {
    let id = localStorage.getItem('id');
    let week = this.state.week;
    if (!Number(id)) return null;
    fetch('http://localhost:8080/goal/person/'+id+'/week?date='+week)
      .then(response => response.json())
       .then(data => 
        this.setState({goals: data})
      );
  }

  checkedOrNot(status, index){
    if(status)return(<input value={index} onClick={this.changeStatus} className="checkbox2" type="checkbox" name="goalStatus" defaultChecked></input>);
    else return(<input value={index} onClick={this.changeStatus} className="checkbox2" type="checkbox" name="goalStatus"></input>);
  }

  render() {
    const localGoals = this.state.goals;
    const list = localGoals && localGoals.map((localGoal, index)=>
    <tr key={localGoal.toString()}>
      <td>{this.checkedOrNot(localGoal.status, index)}</td>
      <td><label className="label-checkbox2">{localGoal.name}</label></td>
    </tr>
    )
    return (
      <div className="todo">
        <div className="h3">Todo list</div>
        <div className="main-table"> 
          <table className="list">
            {list}
          </table>
        </div>
       
        <form onSubmit={this.handleSubmit}>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
            placeholder="  new"
          />
         
        </form>
      </div>

    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }

    this.addGoal(this.state.text,false);
    const newGoal = {
      name: this.state.text,
      status:false,
      id: Date.now()
    };
    this.setState(state => ({
      goals: state.goals.concat(newGoal),
      text: ''
    }));
  }

  addGoal(name,status) {
    if (!this.state.goals.length) {
      return;
    }

    const id = getUserId();

    fetch('http://localhost:8080/goal/add?personId='+id+'&name='+name+'&status='+status+'&week=2019-12-03', 
    {
      headers,
      credentials,
      method: 'POST',
     })
    .then(response => response.json())
    .then(() => {
    console.log("Saved");
    })
  }

  changeStatus(e) {
    if (!this.state.goals.length) {
      return;
    }
    const localGoals = this.state.goals;
    let index = e.target.value;
    let goal = localGoals[index];

    const id = goal.id;
    fetch('http://localhost:8080/goal/'+id+'/update/status', 
    {
      headers,
      credentials,
      method: 'PUT',
     })
    .then(response => response.json())
    .then(() => {
    console.log("Update");
    })
  }
}

export default TodoApp;
