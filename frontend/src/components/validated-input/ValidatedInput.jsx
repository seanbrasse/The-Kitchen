import React from 'react';
import styles from './ValidatedInput.module.css';

export default class ValidatedInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            temporaryError: false
        };
        this.input = React.createRef();
    }

    validate() {
        if (this.state.temporaryError) this.input.current.setCustomValidity('');

        if (this.props.validate) {
            this.input.current.setCustomValidity(this.props.validate());
        }

        this.setState({
            errorMessage: this.input.current.validationMessage,
            temporaryError: false
        });
    }

    /**
     * Sets input to invalid until the next time the validate() is called
     * Specifically intended for server-side errors
     */
    setTemporaryValidity(message) {
        this.input.current.setCustomValidity(message);
        this.setState({
            errorMessage: message,
            temporaryError: true
        });
    }

    render() {
        return (
            <label>
                {this.props.children}<br/>
                <input type={this.props.type} className={this.props.className} required={this.props.required} onChange={e => this.props.onChange(e)}
                    ref={this.input}
                /><br/>
                <span className={styles.errorText}>{this.state.errorMessage}</span>
            </label>
        );
    }
}

