import React from 'react';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { ValidatedInput } from 'components';
import styles from '../Auth.module.css';

const BUTTON_READY = "Set New Password";
const BUTTON_WAITING = "Setting Up Your Account...";

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            otp: '',
            pass: '',
            confirm: '',

            submitText: BUTTON_READY,
            submitDisabled: false
        };
        this.emailInput = React.createRef();
        this.otpInput = React.createRef();
        this.passInput = React.createRef();
        this.confirmInput = React.createRef();
        this.form = React.createRef();
    }

    validatePasswords() {
        if (this.state.pass !== this.state.confirm) {
            return 'Passwords do not match';
        } else {
            return '';
        }
    }

    submit(e) {
        e.preventDefault();

        this.emailInput.current.validate();
        this.otpInput.current.validate();
        this.passInput.current.validate();
        this.confirmInput.current.validate();

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
                action: 'setpassword',
                email_addr: this.state.email,
                token: this.state.otp,
                newpassword: this.state.pass,
                confirmpassword: this.state.confirm
            })
        }).then(res => res.json()).then(
            response => {
                if (response.message === 'OTP Mismatch') {
                    this.otpInput.current.setTemporaryValidity('Invalid one-time password');
                    this.setState({
                        submitText: BUTTON_READY,
                        submitDisabled: false
                    });
                } else this.props.history.replace('/login');
            }
        );
    }

    render() {
        return (
            <main className={styles.authContainer}>
                <article class="card">
                    <h1>Welcome to The Kitchen</h1>
                    <h2>Reset Password</h2>
                    An email has been sent to you with a one-time password.
                    <br/><br/>
                    <form ref={this.form}>
                        <ValidatedInput type="email" className={styles.textInput} onChange={e => this.setState({email: e.target.value})}
                            ref={this.emailInput} required
                        >
                            Email
                        </ValidatedInput>
    
                        <br/>

                        <ValidatedInput type="text" className={styles.textInput} onChange={e => this.setState({otp: e.target.value})}
                            ref={this.otpInput} required
                        >
                            One Time Password
                        </ValidatedInput>
    
                        <br/>

                        <ValidatedInput type="password" className={styles.textInput} onChange={e => this.setState({pass: e.target.value})}
                            ref={this.passInput} required
                        >
                            New Password
                        </ValidatedInput>
    
                        <br/>

                        <ValidatedInput type="password" className={styles.textInput} onChange={e => this.setState({confirm: e.target.value})}
                            ref={this.confirmInput} validate={() => this.validatePasswords()} required
                        >
                            Confirm Password
                        </ValidatedInput>
    
                        <br/>
            
                        <input type="submit" value={this.state.submitText} disabled={this.state.submitDisabled} onClick={e => this.submit(e)} />
    
                        <br/><br/>
                        
                        <NavLink to="/login">Log In</NavLink>
                    </form>
                </article>
            </main>
        );
    }
}

export default withRouter(ResetPassword);
