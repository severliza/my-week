import React, {Component}  from 'react';
import './Planner.css';

class Day extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:props.name,
            events:props.events,
        };
        this.genEvents = this.genEvents.bind(this);
    }

    render() {
        return (
           <div className="day">
              {this.genEvents()}
            </div>
        );
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
      return evnts;
      }

}
export default Day;