import React from 'react';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { ValidatedInput } from 'components';
import styles from '../Auth.module.css'

const BUTTON_READY = "Log In";
const BUTTON_WAITING = "Logging In...";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',

            submitText: BUTTON_READY,
            submitDisabled: false
        };
        this.emailInput = React.createRef();
        this.passInput = React.createRef();
        this.form = React.createRef();
    }

    submit(e) {
        e.preventDefault();

        this.emailInput.current.validate();
        this.passInput.current.validate();

        if (!this.form.current.checkValidity()) {
            return;
        }

        this.setState({
            submitText: BUTTON_WAITING,
            submitDisabled: true
        });
        fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/SocialAuth.php', {
            method: 'post',
            body: JSON.stringify({
                action: 'login',
                username: this.state.email,
                password: this.state.pass
            })
        }).then(res => res.json()).then(
            response => {
                if (response.message === 'Invalid username or password!') {
                    this.passInput.current.setTemporaryValidity('Invalid username or password');
                    this.setState({
                        submitText: BUTTON_READY,
                        submitDisabled: false
                    });
                } else {
                    sessionStorage.setItem('userID', response.user.user_id);
                    sessionStorage.setItem('token', response.user.session_token);
                    sessionStorage.setItem('userEmail', response.user.email_addr);
                    this.props.history.replace('/feed');
                }
            }
        );
    }

    render() {
        return (
            <main className={styles.authContainer}>
                <article>
                    <h1>Welcome to The Kitchen</h1>
                    <h2>Log In</h2>
                    <form ref={this.form}>
                        <ValidatedInput type="email" className={styles.textInput} onChange={e => this.setState({email: e.target.value})}
                            ref={this.emailInput} required
                        >
                            Email
                        </ValidatedInput>
                        
                        <br/>

                        <ValidatedInput type="password" className={styles.textInput} onChange={e => this.setState({pass: e.target.value})}
                            ref={this.passInput} required
                        >
                            Password
                        </ValidatedInput>
                        
                        <br/>
            
                        <input type="submit" value={this.state.submitText} disabled={this.state.submitDisabled} onClick={e => this.submit(e)} />

                        <br/><br/>
                        
                        <NavLink to="/create-account"> Create Account </NavLink>
                        <br/>
                        <NavLink to="/forgot-password"> Forgot Password? </NavLink>
                    </form>
                </article>
            </main>
        );
    }    
}

export default withRouter(Login);
