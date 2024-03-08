import React from 'react';
import styles from './SuccessPage.module.scss';
const SuccessPage = () => {
  return (
    <>
      {' '}
      <div class="card payment-status bg-normal p-sm-30 p-15" style={{ marginTop: 20, height: 'calc(100vh - 157px)' }}>
        <div class="card-body bg-white bg-shadow radius-xl px-sm-30 py-sm-25 m-0 px-15 py-1 d-flex justify-content-center align-items-center">
          <div class="payment-status__area  py-sm-25 py-20 text-center">
            <div class="content-center">
              <span class="wh-50 bg-success rounded-circle content-center">
                <span class="las la-check fs-24 color-white"></span>
              </span>
            </div>
            <h2 class="fw-500 mt-20 mb-10">Оплата прошла успешно</h2>
            <span class="fs-16 color-gray">Спасибо за оплату!</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
