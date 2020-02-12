import React, {Component}  from 'react';
import Week from '../Week/Week';
import Login from '../SignIn/SingIn';
import { getUserId } from '../../utils';
import { toSignUp } from '../../utils';

class Main extends Component{
  
render() {
  const userId = getUserId();
  localStorage.setItem('userId',1);
  localStorage.setItem('signUp',false);
  return(
    <div className="App">
      {userId && userId != 0 ? <Week/> : null}
      {!userId || userId == 0 ? <Login/> : null}
    </div>
  );
  }
}

export default Main;
