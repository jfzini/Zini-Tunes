import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './css/Profile.css';

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
        <section className="results__container album__container">
          {isLoading
            ? (<Loading />)
            : (
              <section className="profile__container">
                <div className="profile__image">
                  <img
                    src={ image }
                    alt={ name }
                    data-testid="profile-image"
                  />
                </div>
                <div className="profile__data">
                  <p className="profile__label">Name</p>
                  <p className="profile__name">{name}</p>
                  <p className="profile__label">E-mail</p>
                  <p className="profile__email">{email}</p>
                  <p className="profile__label">Description</p>
                  <p className="profile__description">{description}</p>
                  <Link to="/profile/edit" className="link">Edit profile</Link>
                </div>
              </section>
            )}
        </section>
      </div>
    );
  }
}

export default Profile;
