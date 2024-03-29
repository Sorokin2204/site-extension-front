import React from 'react';
import styles from './LoginLayout.module.scss';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
const LoginLayout = ({ children }) => {
  return (
    <>
      <main class="main-content">
        <div class="admin">
          <div class="container-fluid">
            <div class="row justify-content-center">
              <div class="col-xxl-3 col-xl-4 col-md-6 col-sm-8">
                <div class="edit-profile">
                  <div class="edit-profile__logos">
                    <Link to="/">
                      <img class="dark" src="/img/logo.svg" alt="" />
                      <img class="light" src="/img/logo.svg" alt="" />
                    </Link>
                  </div>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <Loading /> */}
    </>
  );
};

export default LoginLayout;
