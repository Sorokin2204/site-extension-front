import React, { useEffect, useState } from 'react';
import styles from './LoginPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '../../../components/site/Input/Input';
import Loading from '../../../components/site/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { userSignIn } from '../../../redux/actions/user/userSignIn';
import Button from '../../../components/site/Button/Button';
import { resetUserSignIn } from '../../../redux/slices/user.slice';
import { Helmet } from 'react-helmet';
import TelegramLoginButton from 'telegram-login-button';
const LoginPage = () => {
  const defaultValues = { email: '', password: '' };
  const loginForm = useForm({ defaultValues });
  const {
    userSignIn: { data: signInData, loading: signInLoading, error: signInError },
  } = useSelector((state) => state.user);
  const disaptch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    disaptch(userSignIn(data));
  };
  useEffect(() => {
    return () => {
      disaptch(resetUserSignIn());
    };
  }, []);
  useEffect(() => {
    if (signInData?.access) {
      localStorage.setItem('token', signInData?.access);
      navigate('/overview');
    }
  }, [signInData]);

  useEffect(() => {
    if (signInError) {
      Object.keys(signInError).forEach(function (key, index) {
        if (key !== 'non_field_errors') {
          loginForm.setError(key, { type: 'custom', message: signInError[key] });
        }
      });

      console.log(signInError);
    }
  }, [signInError]);
  return (
    <>
      <Helmet>
        <title>Вход</title>
      </Helmet>
      <div class="card border-0">
        <div class="card-header">
          <div class="edit-profile__title">
            <h4>Вход</h4>
          </div>
        </div>
        <div class="card-body">
          <div class="edit-profile__body">
            <Input form={loginForm} name={'email'} label={'Почта'} classWrap={'mb-25'} />
            <Input form={loginForm} name={'password'} type={'password'} label={'Пароль'} classWrap={'mb-25'} />

            <div class="admin-condition">
              {/* <div class="checkbox-theme-default custom-checkbox ">
                <input class="checkbox" type="checkbox" id="check-1" />
                <label for="check-1">
                  <span class="checkbox-text">Keep me logged in</span>
                </label>
              </div> */}
              <Link to="/forget-password">Забыли пароль?</Link>
            </div>
            <div class="admin__button-group button-group d-flex pt-1 justify-content-md-start justify-content-center">
              <Button className="text-capitalize lh-normal px-50 signIn-createBtn " onClick={loginForm.handleSubmit(onSubmit)}>
                Войти
              </Button>
            </div>
            {signInError?.non_field_errors?.[0] && <p className="error pt-1 d-flex justify-content-center">{signInError?.non_field_errors?.[0]}</p>}
          </div>
        </div>
        <div class="button-group d-flex align-items-center justify-content-center pb-30">
          <p class="mb-0">
            Еще нет аккаунта?&nbsp;
            <Link to="/registration" class="color-primary">
              Зарегистрироваться
            </Link>
          </p>
        </div>{' '}
        {signInLoading && <Loading />}
      </div>
    </>
  );
};

export default LoginPage;
