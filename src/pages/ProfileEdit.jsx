import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    isLoading: false,
    name: '',
    email: '',
    image: '',
    description: '',
    emailValid: false,
    nameValid: false,
    imageValid: false,
    descriptionValid: false,
  };

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    this.setState({
      isLoading: true,
    });
    const { name, email, image, description } = await getUser();
    this.setState({
      isLoading: false,
      name,
      email,
      image,
      description,
    });
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
    this.validateTextInputs(target);
  };

  validateEmail = (value) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    this.setState({
      emailValid: regex.test(value),
    });
  };

  validateTextInputs = (target) => {
    const { value, name, type } = target;
    if (type === 'email') {
      this.validateEmail(value);
      return;
    }
    const inputName = `${name}Valid`;
    this.setState({
      [inputName]: value.length > 0,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, image, description } = this.state;
    const { history } = this.props;
    await updateUser({ name, email, image, description });
    history.push('/profile');
  };

  render() {
    const { isLoading,
      name,
      email,
      image,
      description,
      nameValid,
      emailValid,
      descriptionValid,
      imageValid,
    } = this.state;

    const fieldsValid = nameValid && emailValid && descriptionValid && imageValid;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading
          ? (<Loading />)
          : (
            <form>
              <p>Editar perfil</p>
              <input
                type="text"
                placeholder="Nome"
                data-testid="edit-input-name"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
              <input
                type="email"
                name="email"
                id=""
                placeholder="Email"
                data-testid="edit-input-email"
                value={ email }
                onChange={ this.handleChange }
              />
              <textarea
                name="description"
                id=""
                data-testid="edit-input-description"
                value={ description }
                onChange={ this.handleChange }
              />
              <input
                type="text"
                value={ image }
                name="image"
                data-testid="edit-input-image"
                onChange={ this.handleChange }
              />
              <button
                data-testid="edit-button-save"
                disabled={ !fieldsValid }
                onClick={ this.handleSubmit }
              >
                Salvar alterações
              </button>
            </form>)}
      </div>
    );
  }
}

export default ProfileEdit;

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
