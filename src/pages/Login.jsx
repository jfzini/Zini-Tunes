import React, { Component } from 'react';

class Login extends Component {
  state = {
    nameValue: '',
    validName: false,
  };

  validateName = (value) => {
    const minLength = 3;
    this.setState({
      validName: value.length >= minLength,
    });
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      nameValue: value,
    }, () => this.validateName(value));
  };

  render() {
    const { nameValue, validName } = this.state;

    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        <form action="">
          <label htmlFor="user-name">Nome:</label>
          <input
            type="text"
            id="user-name"
            data-testid="login-name-input"
            value={ nameValue }
            onChange={ this.handleChange }
          />
          <button
            data-testid="login-submit-button"
            disabled={ !validName }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
