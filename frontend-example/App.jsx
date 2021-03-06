import React from "react";
import "./App.css";
import PostForm from "./components/PostForm.jsx";
import FriendList from "./components/FriendList.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Profile from "./components/Profile.jsx";
import FriendForm from "./components/FriendForm.jsx";
import Modal from "./components/Modal.jsx";

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: "main",
      openModal: false
    };
  }

  render() {
    if (this.state.section === "main") {
      return (
        <div>
          <p>Social Media Test Harness</p>
          <LoginForm />
          <PostForm />
        </div>
      );
    } else if (this.state.section === "friends") {
      return (
        <div>
          <p>Friends</p>
          <FriendForm userid={sessionStorage.getItem("user")} />
          <FriendList userid={sessionStorage.getItem("user")} />
        </div>
      );
    } else if (this.state.section === "settings") {
      return (
        <div className="settings">
          <p>Settings</p>
          <Profile userid={sessionStorage.getItem("user")} />
        </div>
      );
    } else {
      return <p>Unidentified Section!</p>;
    }
  }
}

function setMenuOption(mode, maincontent, e) {
  maincontent.current.setState({
    section: mode
  });
}

function toggleModal(app) {
  app.setState({
    openModal: !app.state.openModal
  });
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false
    };
  }

  render() {
    let post = require("./images/post.svg");
    let friend = require("./images/friends.svg");
    let setting = require("./images/settings.svg");
    let help = require("./images/help.svg");
    let mainContent = React.createRef();

    return (
      <div className="App">
        <header className="App-header">
          <div id="sidenav" className="sidenav">
            <ul id="side-menu-items">
              <li className="pm admin student">
                <button
                  className="link-button"
                  onClick={e => setMenuOption("main", mainContent, e)}
                >
                  <img
                    src={post}
                    className="sidenav-icon"
                    alt="Posts"
                    title="Posts"
                  />
                </button>
              </li>
              <li className="pm admin">
                <button
                  className="link-button"
                  onClick={e => setMenuOption("friends", mainContent, e)}
                >
                  <img
                    src={friend}
                    className="sidenav-icon"
                    alt="Friends"
                    title="Friends"
                  />
                </button>
              </li>
              <li className="pm admin">
                <button
                  className="link-button"
                  onClick={e => setMenuOption("settings", mainContent, e)}
                >
                  <img
                    src={setting}
                    className="sidenav-icon"
                    alt="Settings"
                    title="Settings"
                  />
                </button>
              </li>
              <li className="pm admin">
                <button
                  className="link-button"
                  onClick={e => toggleModal(this, e)}
                >
                  <img
                    src={help}
                    className="sidenav-icon"
                    alt="Settings"
                    title="Settings"
                  />
                </button>
              </li>
            </ul>
          </div>
          <div className="maincontent" id="mainContent">
            <MainContent ref={mainContent} />
          </div>
        </header>
        <Modal show={this.state.openModal} onClose={e => toggleModal(this, e)}>
          This is a modal dialog!
        </Modal>
      </div>
    );
  }
}

export default App;
