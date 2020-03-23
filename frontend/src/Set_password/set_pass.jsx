import React from 'react';
import ReactDOM from 'react-dom';
import './set_password.css';

class Msg extends React.Component {
  constructor(props) {
    super(props);

  }
}

class Form extends React.Component {
   constructor(props) {
    super(props);
    this.state = {value: '',
                 password: '', 
                  conf_pass: '',
                  email: ''};

    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleChangeConfPass = this.handleChangeConfPass.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  }

  
  handleChangePass(event) {
    this.setState({this.password: event.target.value});
    alert(this.password);
  }
  handleChangeConfPass(event) {
    this.setState({this.conf_pass: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    validate(this);
  }

  render() {
  
      return (

  <div className="container">
    <div className="logo">Set Password</div>
    <div className="login-item">
      <form action=""  className="form form-login">
          <a id="uname"> Password</a>
                <div id="message">
          <h3>Password must contain the following:</h3>
          <p id="letter" >A <b>lowercase</b> letter</p>
          <p id="capital">A <b>capital (uppercase)</b> letter</p>
          <p id="number" >A <b>number</b></p>
          <p id="length" >Minimum <b>8 characters</b></p>
              </div>
        <div className="form-field">
          <input id="login-username" type="text" className="form-input" onChange={this.handleChangePass} required/>

      </div>

      <a id="cname">Confirm Password</a>
        <div className="form-field">
          <input id="login-username" type="text" className="form-input" onChange={this.handleChangeConfPass} required/>
      </div>
      <div className="form-field">
          <input type="submit" value="Submit" onClick={this.handleClick}/> 
        </div>
    </form>
  </div> 
</div>
        );
  }
}

function validate(props) {
       

      }

class App extends React.Component {

   constructor(props) {
  super(props);
  
}

    
  render() {
    return (
           <Form >  </Form>
    );
  }
}




ReactDOM.render(
  <App />,
  document.getElementById('root')
);