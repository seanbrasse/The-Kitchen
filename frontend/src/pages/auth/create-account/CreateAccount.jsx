import React, { Fragment } from 'react';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { ValidatedInput } from 'components';
import styles from '../Auth.module.css';

const BUTTON_READY = "Create Account";
const BUTTON_WAITING = "Setting Up Your Account...";

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            submitDisabled: false
        };
        this.emailInput = React.createRef();
        this.form = React.createRef();
    }

    async submit(e) {
        e.preventDefault();

        this.emailInput.current.validate();
        if (!this.form.current.checkValidity()) {
            return;
        }

        this.setState({
            submitDisabled: true
        });
        
        const userResponse = await fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/usercontroller.php', {
            method: 'post',
            body: JSON.stringify({
                action: 'getUsers',
                emailaddr: this.state.email
            })
        }).then(res => res.json());

        if (userResponse.users) {
            this.emailInput.current.setTemporaryValidity(
                <Fragment>A user account with this email already exists - <NavLink to="/forgot-password">Reset Password?</NavLink></Fragment>
            );

            this.setState({
                submitDisabled: false
            });

            return;
        }

        fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/SocialAuth.php', {
            method: 'post',
            body: JSON.stringify({
                action: 'register',
                email_addr: this.state.email
            })
        }).then(res => res.json()).then(
            response => {
                this.props.history.replace('/finalize-account')
            }
        );
    }

    render() {
        return (
            <main className={styles.authContainer}>
                <article class="card">
                    <h1>Welcome to The Kitchen</h1>
                    <h2>Sign Up</h2>
                    <form ref={this.form}>
                        <ValidatedInput type="email" className={styles.textInput} onChange={e => this.setState({email: e.target.value})}
                            ref={this.emailInput} required
                        >
                            Email
                        </ValidatedInput>
    
                        <br/>
            
                        <input type="submit" value={this.state.submitDisabled ? BUTTON_WAITING : BUTTON_READY} onClick={e => this.submit(e)} disabled={this.state.submitDisabled} />
    
                        <br/><br/>
                        
                        <NavLink to="/login">Log In</NavLink>
                    </form>
                </article>
            </main>
        );
    }
}

export default withRouter(CreateAccount);
