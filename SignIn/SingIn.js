import React, {Component}  from 'react';
import './SignIn.css';
import image from '../../images/img.jpg';
import { toSignUp } from '../../utils';

  class Login extends Component{
    constructor(props) {
      super(props);
      this.state = {
        login: null,
        password:null,
        id: null
      };
      this.submit = this.submit.bind(this);
      this.changeSignUp = this.changeSignUp.bind(this);
      this.findUser = this.findUser.bind(this);
      this.addUser = this.addUser.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleInputChangePass = this.handleInputChangePass.bind(this);
     
      this.genHeader = this.genHeader.bind(this);
    }

  componentDidMount(){
    console.log(toSignUp());
  }
  
  findUser(){
    if (this.state.login==null) {
      return;
    }
    // fetch('http://localhost:8080/person/login?login='+ this.state.login)
    fetch('http://localhost:8080/person/login/password?login='+ this.state.login+'&password='+this.state.password)
    .then(response => response.json())
    .then(data => 
      this.setState({ 
        id:data
      })
    );
  }

  addUser(){
    if (this.state.login==null) {
      return;
    }

    fetch('http://localhost:8080/person/login/password?login='+ this.state.login+'&password='+this.state.password)
    .then(response => response.json())
    .then(data => 
      this.setState({ 
        id:data
      })
    );
  }

  submit= async() => {
    if(toSignUp()=='true'){
      this.addUser();
    }else{
      this.findUser();
    }
  }

  changeSignUp = () =>{
    if(toSignUp()=='true'){
      localStorage.setItem('signUp', false);
    }else {localStorage.setItem('signUp', true);}
  }

  render() {
    if(this.state.id){
      localStorage.setItem('id', this.state.id);
    }

    return (
      <div>
        <div className="login">
          <div className="wrap-login">
            <div className="form-title" style={{backgroundImage: `url(${image})`}}>
              <span className="form-title-span">
                {this.genHeader()}
              </span>
            </div>


            <form onSubmit={this.submit} className="login-form">
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
                  <button onClick={this.changeSignUp} className="a" className="txt1">
                    {this.genButton()}
                  </button>
                </div>
					    </div>

              <div className="container-login-form-btn">
                <button className="login-form-btn">
                  {this.genMainButton()}
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
  
    genHeader(){
      if(toSignUp()=='true'){return "Sign Up"}else{ return "Sign In"}
    }
    genButton(){
      if(toSignUp()=='true'){return "Log in"}else{ return "Sign Up"}
    }
    genMainButton(){
      if(toSignUp()=='true'){return "Sign up"}else{ return "Login"} 
    }

  }
  
export default Login;
  

