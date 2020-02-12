import React, {Component}  from 'react';
import './Week.css';
import TodoApp from '../TodoList/ToDo';
import Tracker from '../Tracker/Tracker';
import Planner from '../Planner/Planner';
//import PlannerDiv from '../Planner/PlannerDiv';
import image from '../../images/img2.jpg';
import Login from '../SignIn/SingIn';

class Week extends Component{
  constructor(props) {
    super(props)
    this.state = {
      isLogin: true,
      week: '2019-12-03',  //написать функцию определения времени
      month:'December',
      days: [23,29]
    }
}

componentWillUnmount() {}

componentDidMount(){
  let newDate = new Date()
  let month = newDate.getMonth(); //написать функцию 
  //this.setState({month: currentMonth});
  //this.setState({week: currentWeek});
  //this.setState({days: currentDays});
}

signOut(){
  this.setState({isLogin: false});
}

render() {
    if(!this.state.isLogin) 
    localStorage.setItem('id', '0');
    return (
      <div className="Week" style={{backgroundImage: `url(${image})`}}>
        {/* {!this.state.isLogin && <Login />} */}
        <header className="Week-header">
          <div className="monthName">
            <div className="month">{this.state.month}</div>
            <div className="dates">{this.state.days[0]} - {this.state.days[1]}</div>
          </div>

          <form className="signOut">
            <button className="signout-btn" onClick={this.signOut.bind(this)}>Sign out</button> 
          </form>
          
        </header>
        <div className="container">
          <div className = "leftPart">
            <div>
              <TodoApp week={this.state.week}/>
            </div>

            <div>
              <Tracker week={this.state.week}/>
            </div>
          </div>

          <div className="rightpart">
            <Planner week={this.state.week}/>
          </div>
        </div>
        
      
    </div>
    )
  }
}

export default Week;
