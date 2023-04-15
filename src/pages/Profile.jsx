import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends Component {
  state = {
    isLoading: false,
    userData: {},
  };

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    this.setState({
      isLoading: true,
    });
    const userData = await getUser();
    this.setState({
      isLoading: false,
      userData,
    });
  };

  render() {
    const { isLoading, userData: { name, email, image, description } } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading
          ? (<Loading />)
          : (
            <section>
              <p>{name}</p>
              <p>{email}</p>
              <img src={ image } alt={ name } data-testid="profile-image" />
              <p>{description}</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </section>
          )}
      </div>
    );
  }
}

export default Profile;
