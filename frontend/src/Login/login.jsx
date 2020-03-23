import React from 'react';
import ReactDOM from 'react-dom';
import './cs.css';

class NameForm extends React.Component {
   constructor(props) {
    super(props);
    this.state = {value: '',
                  username: '', 
                  password: '',
                  isValid: false};

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

  handleClickFGPWORD(event) {
    alert('hi');
  }

  handleClickCreate(event) {
    alert('make acount');
  }

  handleClick(event) {
    if (isValid == true) {
      //send post reqeust to change the password
    }
  }

  render() {
  
      return (
        <body>
                  <div id="container">
    <div className="logo">Welcome to The Kitchen</div>
    <div className="login-item">
      <form  className={"form form-login"}>

          <a id="uname"> Username </a>  
        <div className={"form-field"}>
          <input id="login-username" type="text" className={"form-input"} /> 
        </div>


        <div id="space" />

           <a id="pname"> Password </a>
        <div className={"form-field"}>
          <div id="break">
          <input id="login-password" type="password" className={"form-input"} /> 
          <a id ="fpw" > Forgot Password?  </a>  
        </div>
        </div>

        <div className={"form-field"}>
          <input type="submit" value="Log in" required />
        </div>

        <div id="acct"> <a id ="myt" href="www.google.com" onClick="handleClick()" > Click Here to Make an Account </a> </div>
      </form>
    </div>
    </div>


 </body>
        );
  }
}


function validate(props) {
         var user = props.state.username;
         var pass = props.state.password;

         alert (user);
         alert(pass);

      //   document.getElementById("user_errors").innerHTML = "";
        // document.getElementById("pass_errors").innerHTML = ""; 

         let valid = true;


        /*  if( user == "") {
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
              submitJson(null, 'usercontroller.php', {'action':'getUsers','username':document.getElementById('username_users').value}, login);
          }
           return 0;  */
      }

class App extends React.Component {

   constructor(props) {
  super(props);
  
}

    
  render() {
    return (
           <NameForm >  </NameForm>
    );
  }
}




ReactDOM.render(
  <App />,
  document.getElementById('root')
);