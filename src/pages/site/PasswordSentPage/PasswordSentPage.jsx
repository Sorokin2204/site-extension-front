import React from 'react';
import styles from './PasswordSentPage.module.scss';
import Button from '../../../components/site/Button/Button';
import { useNavigate } from 'react-router';
const PasswordSentPage = () => {
  const navigate = useNavigate();
  return (
    <>
      {' '}
      <div class="card  bg-normal p-sm-30 p-15">
        <div class="card-body bg-white bg-shadow radius-xl px-sm-30 pt-sm-25 m-0 p-0">
          <div class="payment-status__area  py-sm-25 py-20 text-center">
            <div class="content-center">
              <span class="wh-34 bg-success rounded-circle content-center">
                <span class="las la-check fs-16 color-white"></span>
              </span>
            </div>
            <h4 class="fw-500 mt-20 mb-10">Пароль отправлен на почту</h4>
            <span class="fs-15 color-gray">На указанную почту отправлен новый пароль</span>
            <Button
              onClick={() => {
                navigate('/login');
              }}
              className="btn-sm content-center mx-auto mt-20">
              Назад
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordSentPage;
