import React, {Component}  from 'react';
import './Planner.css';
//import Day from './Planner';

const headers = {
  'Content-type': 'application/json',
  Accept: 'application/json;charset=UTF-8',
  'Access-Control-Allow-Origin': '*',
}
const credentials = 'same-origin'

class Planner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      week: props.week,
      events:[],
      
      newName:'',
      newStart:'',
      newEnd:''
    }

    this.splitOnDays = this.splitOnDays.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }

  componentDidMount() {
    let id = localStorage.getItem('id');
    fetch('http://localhost:8080/event/person/'+id+'/week?date=2019-12-03', {
      headers,credentials}) 
      .then(response => response.json())
       .then(data => 
        this.setState({events: data})
      );
  }

  addEvent() {
    let id = localStorage.getItem('id');
    fetch('http://localhost:8080/event/add?personId='+id+'&name=with family&start=16:00&end=20:00&week=2019-12-03&dayOfTheWeek=0', 
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

  render() {
    let splitEvents = this.splitOnDays();
    return (
      <div className="planner">
        <table className="t">
          <tr><th></th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th><th>S</th></tr>
          <tr>
              <td>6</td>
              <td rowspan="19"><Day name="mon" events={splitEvents[0]}/></td>
              <td rowspan="19"><Day name="tue" events={splitEvents[1]}/></td>
              <td rowspan="19"><Day name="wed" events={splitEvents[2]}/></td>
              <td rowspan="19"><Day name="wed" events={splitEvents[3]}/></td>
              <td rowspan="19"><Day name="wed" events={splitEvents[4]}/></td>
              <td rowspan="19"><Day name="wed" events={splitEvents[5]}/></td>
              <td rowspan="19"><Day name="wed" events={splitEvents[6]}/></td>
          </tr>
          <tr><td>7</td></tr><tr><td>8</td></tr><tr><td>9</td></tr><tr><td>10</td></tr><tr><td>11</td></tr><tr><td>12</td></tr>
          <tr><td>13</td></tr><tr><td>14</td></tr><tr><td>15</td></tr><tr><td>16</td></tr><tr><td>17</td></tr><tr><td>18</td></tr>
          <tr><td>19</td></tr><tr><td>20</td></tr><tr><td>21</td></tr><tr><td>22</td></tr><tr><td>23</td></tr>
        </table>

        <div className="add">
         Add new event
            <input 
            onChange={this.handleChangeName}
            value={this.state.text}
            />
            <div className="time-panel">
              <input  onChange={this.handleChangeStart} className="time"></input>  
              <input  onChange={this.handleChangeEnd} className="time"></input>
            </div>
            <button onClick={this.addEvent} className="btn-add">+</button>
        </div>
        
    
      </div>
    );
  }

  splitOnDays(){ 
    const localEv = this.state.events;
    const localSplit = [[],[],[],[],[],[],[]];
    localEv.map((event, index)=>{
      localSplit[event.dayOfTheWeek].push(event);
    });
    return localSplit;
  }

  handleChangeName(e) {
    this.setState({ newName: e.target.value });
  }

  handleChangeStart(e) {
    this.setState({ newStart: e.target.value });
  }

  handleChangeEnd(e) {
    this.setState({ newEnd: e.target.value });
  }
}

class Day extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:props.name,
            events:props.events,
        };
        this.genEvents = this.genEvents.bind(this);
    }

    convert(str){
      let time = [];
      time.push(Number(str.slice(0,2)));
      time.push(Number(str.slice(3)));
      return time;
    }

    calcHight(event){
      const localEv = event;
      let start = this.convert(localEv.start);
      let end = this.convert(localEv.end); 

      //улучшить
      return (end[0]-start[0])*28 + 'px';
    }

    calcPaddingTop(event){
      const localEv = event;
      let start = this.convert(localEv.start);
      console.log((start[0]-6)*28 +'px');
      return (start[0]-6)*28 +'px';
    }

    genEvents() {
      let start = 124;
      let end = 574;
      const events = this.props.events;
      
      let h;
      let randomColor;
      let top;

      const evnts = events.map((event, index)=>{
        h = this.calcHight(event);
        top = this.calcPaddingTop(event)
        randomColor = '#'+Math.random().toString(16).substr(-6);
        return (
          <div className="event" style={{ backgroundColor: randomColor, width: "100%", height: h, marginTop:top}}>
          <div className="eventName">{event.name}<br/>  {event.start}-{event.end}</div> 
          </div>
        );
      }
      )

      // let arr = [1,2,3,4,5,6];
      // const evnts = arr.map((event, index)=>
      // <div style={{ backgroundColor: "#44014C", width: "100%", minHeight: "10px"}}>
      //   Event + {index}
      // </div>
      // )
      return evnts;
      }

      
    render() {
        return (
           <div className="day">
              {this.genEvents()}
            </div>
        );
    }
}

export default Planner;
