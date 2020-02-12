import React, {Component}  from 'react';
import './SignIn.css';
import image from '../../images/img.jpg';
import Login from './SingIn';

  class SignUp extends Component{
    constructor(props) {
      super(props);
      this.state = {
        login: null,
        password:null,
        id: null,
        logIn:false
      };
      this.logIn = this.logIn.bind(this);
      this.addUser = this.addUser.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleInputChangePass = this.handleInputChangePass.bind(this);
      //this.validPass = this.validPass.bind(this);
    }

  componentDidMount(){}
  
  addUser(){
    if (this.state.login==null || this.state.password==null) {
      return;
    }
    fetch('http://localhost:8080/person/login/password?login='+ this.state.login+'&password='+this.state.password)
    .then(response => response.json())
    .then(data => 
      this.setState({ 
        id:data//////////////
      })
    );
  }

  logIn = () =>{
    this.setState({logIn: true});
  }

  render() {
    if(this.state.id){
      //localStorage.setItem('id', this.state.id);
    }
    return (
      <div>
      {this.state.logIn && <Login/>}
        <div className="login">
          <div className="wrap-login">
            <div className="form-title" style={{backgroundImage: `url(${image})`}}>
              <span className="form-title-span">
                Sign Out
              </span>
            </div>


            <form onSubmit={this.addUser} className="login-form">
              <div className="wrap-input validate-input m-b-26" data-validate="Username is required">
                <span className="label-input">Username</span>
                <input onChange={this.handleInputChange} className="input" type="text" name="username" placeholder="Enter username"></input>
                <span className="focus-input"></span>
              </div>

              <div className="wrap-input validate-input m-b-18" data-validate = "Password is required">
                <span className="label-input">Password</span>
                <input onChange={this.handleInputChangePass} className="input" type="password" name="pass" placeholder="Enter password"></input>
                <span className="focus-input"></span>
              </div>

              <div className="sign-up">
                <div>
                  <button onClick={this.logIn} className="a" className="txt1">
                    Log in
                  </button>
                </div>
					    </div>

              <div className="container-login-form-btn">
                <button className="login-form-btn">
                  Sign up
                </button>
              </div>
				    </form>
          </div>
        </div>
      </div>
    );
    }

    handleInputChange(event) {
      this.setState({login: event.target.value});
    }
  
    handleInputChangePass(event) {
      this.setState({password: event.target.value});
    }
}
  
export default SignUp;
  

