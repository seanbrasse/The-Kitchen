import React from "react";
import "../App.css";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      responseMessage: ""
    };
    this.fieldChangeHandler.bind(this);
  }

  fieldChangeHandler(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value
    });
  }

  componentDidMount() {
    //make the api call to the user API to get the user with all of their attached preferences
    fetch("http://stark.cse.buffalo.edu/hci/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getCompleteUsers",
        user_id: this.props.userid
      })
    })
      .then(res => res.json())
      .then(
        result => {
          if (result.users) {
            console.log(result.users);
            this.setState({
              // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
              // try and make the form component uncontrolled, which plays havoc with react
              username: result.users[0].username || "",
              firstname: result.users[0].first_name || "",
              lastname: result.users[0].last_name || ""
            });
          }
        },
        error => {
          alert("error!");
        }
      );
  }

  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the user controller
    fetch("http://stark.cse.buffalo.edu/hci/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "addOrEditUsers",
        username: this.state.username,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        user_id: sessionStorage.getItem("user"),
        session_token: sessionStorage.getItem("token"),
        mode: "ignorenull"
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            responseMessage: result.Status
          });
        },
        error => {
          alert("error!");
        }
      );
  };

  render() {
    return (
      <form onSubmit={this.submitHandler} className="profileform">
        <label>
          Username
          <input
            type="text"
            onChange={e => this.fieldChangeHandler("username", e)}
            value={this.state.username}
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            onChange={e => this.fieldChangeHandler("firstname", e)}
            value={this.state.firstname}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            onChange={e => this.fieldChangeHandler("lastname", e)}
            value={this.state.lastname}
          />
        </label>
        <input type="submit" value="submit" />
        <p>Username is : {this.state.username}</p>
        <p>Firstname is : {this.state.firstname}</p>
        {this.state.responseMessage}
      </form>
    );
  }
}
