import React from 'react';
import ReactDOM from 'react-dom';
import './login.css';

class NameForm extends React.Component {
   constructor(props) {
    super(props);
    this.state = {value: '',
                  username: '', 
                  password: ''};

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }
  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleClick(event) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    validate(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    validate(this);
  }

  render() {
  
      return (
  <div id="username">
             <form name="fo" onSubmit={this.handleSubmit}>
                 <label for="uname">Username</label>
                 <input type="text" id="unamel" name="uname"  onChange={this.handleChangeUsername} />
                 <small id="user_errors"></small>
                 <label for="pword">Password</label>
                 <input type="password" id="pwordl" name="pword" onChange={this.handleChangePassword} />
                 <small id="pass_errors"></small>
                 <div id="fgpass">
                    <a href="www.google.com">Forgot Password?</a>
                 </div>
                 <label for="sub"></label> 
                 <input type="submit" onClick={this.handleClick} value="Submit" />
                 <div id="make_acc"> 
                    <a href="www.google.com">Don't have an account? Click <b>Here</b> to make one for free!</a>
                 </div>  
              </form>

        </div>
        );
  }
}

function validate(props) {
         var user = props.state.username;
         var pass = props.state.password;

         alert (user);
         alert(pass);

         document.getElementById("user_errors").innerHTML = "";
         document.getElementById("pass_errors").innerHTML = ""; 

         let valid = true;


          if( user == "") {
              document.getElementById("user_errors").innerHTML = "Username is empty!";
              document.getElementById("unamel").focus();
              document.getElementById("user_errors").style.color = "red";
              valid = false;
            }
          if(pass == "") {
              document.getElementById("pass_errors").innerHTML = "Password is empty!";
              document.getElementById("pwordl").focus();
              document.getElementById("pass_errors").style.color = "red";
              valid = false;
            }
          if (valid == true){
             // submitJson(null, 'usercontroller.php', {'action':'getUsers','username':document.getElementById('username_users').value}, login);
          }
           return 0; 
      }

class App extends React.Component {

   constructor(props) {
  super(props);
  
}

    

  render() {
    return (

      <div id="container">
        <div id="header">
          <h1>  Welcome to The Kitchen </h1>
        </div>  
           <NameForm> 
           </NameForm>
    </div>
    );
  }
}


ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);