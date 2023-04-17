import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../components/Loading';
import './css/Login.css';

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
    const { isLoading, handleSubmit } = this.props;

    return (
      <div data-testid="page-login" className="login__container">
        {isLoading
          ? (<Loading />)
          : (
            <>
              <h2 className="login__title">Login</h2>
              <form action="" className="login__form">
                <label htmlFor="user-name">Nome:</label>
                <input
                  type="text"
                  id="user-name"
                  data-testid="login-name-input"
                  value={ nameValue }
                  onChange={ this.handleChange }
                />
                <button
                  type="submit"
                  data-testid="login-submit-button"
                  disabled={ !validName }
                  onClick={ () => handleSubmit(nameValue) }
                >
                  Entrar
                </button>
              </form>
            </>)}
      </div>
    );
  }
}

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Login;
