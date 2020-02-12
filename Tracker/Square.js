import React from 'react';
import './Tracker.css';

class Square extends React.Component{
    constructor(props) {
      super(props);
      
      this.state = {
        done: props.done,
        color: props.color
      };
    } 
  
    click(){
      this.setState({done: !this.state.done});
    }
  
    render(){
      if(this.state.done){
        return (
          <div style={{backgroundColor: this.state.color}} className="square" onClick={this.click.bind(this)}></div>
        );
      }else{
        return (
          <div className="square" onClick={this.click.bind(this)}></div>
        );
      }
      
    }
  }

  
  export default Square;