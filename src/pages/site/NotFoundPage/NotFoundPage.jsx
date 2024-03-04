import React from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const NotFoundPage = () => {
  return (
    <>
      {' '}
      <Helmet>
        <title>Не найдено</title>
      </Helmet>
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="min-vh-100 content-center">
              <div class="error-page text-center">
                <img src="/img/svg/404.svg" alt="404" class="svg" />
                <div class="error-page__title">404</div>
                <h5 class="fw-500">Страница не найдена</h5>
                <div class="content-center mt-30">
                  <Link to="/" class="btn btn-primary btn-default btn-squared px-30">
                    На главную
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
