import React from 'react';
import ReactDOM from 'react-dom';
import './acct_v.css';

class MSG extends React.Component {
   constructor(props) {
    super(props);
    this.state = {value: '',
                  first_name: '', 
                  last_name: '',
                  email: ''};
  }



  render() {
  
      return (
  


<div class="container">
    <div class="logo">Create Account</div>  
    <a> Follow the link from your email to set your password. </a>.
  </div>
        );
  }
}

function validate(props) {
         var user = props.state.first_name;
         var pass = props.state.last_name;

         alert (user);
         alert(pass);

      //   document.getElementById("user_errors").innerHTML = "";
        // document.getElementById("pass_errors").innerHTML = ""; 

         let valid = true;


        /*  if( user == "") {
              document.getElementById("user_errors").innerHTML = "first_name is empty!";
              document.getElementById("unamel").focus();
              document.getElementById("user_errors").style.color = "red";
              valid = false;
            }
          if(pass == "") {
              document.getElementById("pass_errors").innerHTML = "last_name is empty!";
              document.getElementById("pwordl").focus();
              document.getElementById("pass_errors").style.color = "red";
              valid = false;
            }
          if (valid == true){
              submitJson(null, 'usercontroller.php', {'action':'getUsers','first_name':document.getElementById('first_name_users').value}, login);
          }
           return 0;  */
      }

class App extends React.Component {

   constructor(props) {
  super(props);
  
}

    
  render() {
    return (
           <MSG >  </MSG>
    );
  }
}




ReactDOM.render(
  <App />,
  document.getElementById('root')
);