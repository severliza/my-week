import React from 'react';
import './Tracker.css';
import Square from './Square';

const headers = {
  'Content-type': 'application/json',
  Accept: 'application/json;charset=UTF-8',
  'Access-Control-Allow-Origin': '*',
}
const credentials = 'same-origin'

class Tracker extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      week: props.week,
      habits:[],
      newHabit: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.addHabit = this.addHabit.bind(this);
    this.deleteHabit = this.deleteHabit.bind(this);
  }  

  componentDidMount() {
    let id = localStorage.getItem('id');
    if (!Number(id)) return null;
    fetch('http://localhost:8080/habit/person/'+id+'/week?date=2019-12-03', {
      headers,credentials
     }) 
      .then(response => response.json())
       .then(data => 
        this.setState({habits: data})
      );
  }

  handleChange(e) {
    this.setState({ newHabit: e.target.value });
  }

  addHabit() {
    if (!this.state.newHabit.length) {
      return;
    }

    let randomColor = '#'+Math.random().toString(16).substr(-6);
    let id = localStorage.getItem('id');
    let name = this.state.newHabit;
    let week = this.state.week;

    // fetch('http://localhost:8080/habit/add?personId='+personId+'&name='+name+'&week='+week+'&color='+randomColor , 
    fetch('http://localhost:8080/habit/add?personId='+id+'&name='+name+'&week=2019-12-03&color=grey', 
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

  deleteHabit(e, index) { 
    fetch('http://localhost:8080/habit/delete/'+ e.target.value, {
      headers,
      credentials,
      method: 'DELETE',
     })
    .then(response => {
      const copyHabits = [...this.state.habits];
      copyHabits.splice(index, 1);
      this.setState({habits: copyHabits});
      console.log("delete");
    })
    .catch(error => {
      console.log(error);
      throw new Error(error);
    })
  }

  genHabits() {
  const habits = this.state.habits;
    const table = habits.map((habit, index)=>
    <tr className="habit">
    <td className="name-of-habit" >{habit.name}</td>
      <td><Square done={habit.mon} color={habit.color}/></td>
      <td><Square done={habit.tue} color={habit.color}/></td>
      <td><Square done={habit.wed} color={habit.color}/></td>
      <td><Square done={habit.thu} color={habit.color}/></td>
      <td><Square done={habit.fri} color={habit.color}/></td>
      <td><Square done={habit.sat} color={habit.color}/></td>
      <td><Square done={habit.sun} color={habit.color}/></td>
      <td><button onClick={(event) => this.deleteHabit(event, index)} value={habit.id}>-</button></td>
    </tr>
    )
    return table;
  }

  render() { 
    return (
      <div className="tracker">
        <div className="h3">Tracker</div>

        <div className="for-table">
          <table className="table">
            <tr className="habit">
              <th className="name-of-habit"></th>
              <th className="nameOfTheDay">m</th>
              <th className="nameOfTheDay">t</th>
              <th className="nameOfTheDay">w</th>
              <th className="nameOfTheDay">t</th>
              <th className="nameOfTheDay">f</th>
              <th className="nameOfTheDay">s</th>
              <th className="nameOfTheDay">s</th>
            </tr>

            {this.genHabits()}
          </table>
        </div>
        
        
        <form onSubmit={this.addHabit} >
          <input
            id="new-tracker"
            onChange={this.handleChange}
            //value={this.state.text}
          />
          <button >+</button>
        </form>
      </div>
    );
  }
}

export default Tracker;
