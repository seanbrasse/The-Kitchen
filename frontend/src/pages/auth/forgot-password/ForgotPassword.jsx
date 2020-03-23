import React from 'react';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { ValidatedInput } from 'components';
import styles from '../Auth.module.css';

const BUTTON_READY = "Request One Time Login";
const BUTTON_WAITING = "Setting Up Your Account...";

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            submitText: BUTTON_READY,
            submitDisabled: false
        };
        this.emailInput = React.createRef();
        this.form = React.createRef();
    }

    submit(e) {
        e.preventDefault();

        this.emailInput.current.validate();
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
                action: 'forgotpassword',
                email_addr: this.state.email
            })
        }).then(res => res.json()).then(
            response => {
                this.props.history.replace('/reset-password')
            }
        );
    }
    
    render() {
        return (
            <main className={styles.authContainer}>
                <article>
                    <h1>Welcome to The Kitchen</h1>
                    <h2>Request Password Reset</h2>
                    <form ref={this.form}>
                        <ValidatedInput type="email" className={styles.textInput} onChange={e => this.setState({email: e.target.value})}
                            ref={this.emailInput} required
                        >
                            Email
                        </ValidatedInput>
    
                        <br/>
            
                        <input type="submit" value={this.state.submitText} onClick={e => this.submit(e)} disabled={this.state.submitDisabled} />
    
                        <br/><br/>
                        
                        <NavLink to="/login">Log In</NavLink>
                    </form>
                </article>
            </main>
        );
    }
}

export default withRouter(ForgotPassword);
