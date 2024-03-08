import React from 'react';
import styles from './ErrorPage.module.scss';
const ErrorPage = () => {
  return (
    <>
      {' '}
      <div class="card payment-status bg-normal p-sm-30 p-15" style={{ marginTop: 20, height: 'calc(100vh - 157px)' }}>
        <div class="card-body bg-white bg-shadow radius-xl px-sm-30 py-sm-25 m-0 px-15 py-1 d-flex justify-content-center align-items-center">
          <div class="payment-status__area  py-sm-25 py-20 text-center">
            <div class="content-center">
              <span class="wh-50 bg-danger rounded-circle content-center">
                <span class="las la-times fs-24 color-white"></span>
              </span>
            </div>
            <h2 class="fw-500 mt-20 mb-10">Оплата не прошла</h2>
            <span class="fs-16 color-gray">Попробуйте еще раз</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
