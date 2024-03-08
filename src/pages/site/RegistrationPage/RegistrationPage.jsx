import React, { useEffect } from 'react';
import styles from './RegistrationPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../../components/site/Input/Input';
import { useForm } from 'react-hook-form';
import Button from '../../../components/site/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { userSignUp } from '../../../redux/actions/user/userSignUp';
import Loading from '../../../components/site/Loading/Loading';
import { Helmet } from 'react-helmet';
const RegistrationPage = () => {
  const registrationForm = useForm();
  const dispatch = useDispatch();
  const {
    userSignUp: { data: signUpData, loading: signUpLoading, error: signUpError },
  } = useSelector((state) => state.user);
  const onSubmit = (data) => {
    dispatch(userSignUp(data));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (signUpError) {
      Object.keys(signUpError).forEach(function (key, index) {
        if (key !== 'non_field_errors') {
          registrationForm.setError(key, { type: 'custom', message: signUpError[key]?.[0] });
        }
      });

      console.log(signUpError);
    }
  }, [signUpError]);
  useEffect(() => {
    if (signUpData?.access) {
      localStorage.setItem('token', signUpData?.access);
      navigate('/overview');
    }
  }, [signUpData]);

  return (
    <>
      <Helmet>
        <title>Регистрация</title>
      </Helmet>
      <div class="card border-0">
        <div class="card-header">
          <div class="edit-profile__title">
            <h4>Регистрация</h4>
          </div>
        </div>
        <div class="card-body">
          <div class="edit-profile__body">
            <div class="edit-profile__body">
              <Input
                form={registrationForm}
                name={'email'}
                type={'text'}
                label={'Почта'}
                classWrap={'mb-25'}
                rules={{
                  required: { message: 'Обязательное поле', value: true },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Неверный формат почты',
                  },
                }}
              />
              <Input
                form={registrationForm}
                name={'password1'}
                type={'password'}
                label={'Пароль'}
                classWrap={'mb-25'}
                rules={{
                  required: { message: 'Обязательное поле', value: true },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/i,
                    message: 'Пароль должен содержать минимум: \n - Одну заглавную букву \n- Одну маленькую букву \n- Одну цифру \n- Длинну более 8 символов ',
                  },
                }}
              />
              <Input
                form={registrationForm}
                name={'password2'}
                type={'password'}
                label={'Повторите пароль'}
                classWrap={'mb-10'}
                rules={{
                  required: { message: 'Обязательное поле', value: true },
                  validate: (val) => {
                    if (registrationForm.watch('password1') != val) {
                      return 'Пароли не совпадают';
                    }
                  },
                }}
              />
              <div className="mb-25" style={{ fontSize: '12px' }}>
                Нажимая кнопку "зарегистрироваться" вы соглашаетесь с{' '}
                <a href="/privacy.pdf" target="_blank">
                  политикой конфиденциальности
                </a>
              </div>
              {/* <div class="admin-condition">
                <div class="checkbox-theme-default custom-checkbox ">
                  <input class="checkbox" type="checkbox" id="admin-1" />
                  <label for="admin-1">
                    <span class="checkbox-text">
                      Creating an account means you’re okay with our{' '}
                      <a href="#" class="color-primary">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" class="color-primary">
                        Privacy Policy
                      </a>
                      my preference
                    </span>
                  </label>
                </div>
              </div> */}
              <div class="admin__button-group button-group d-flex pt-1 justify-content-md-start justify-content-center">
                <Button className="text-capitalize lh-normal px-50 signIn-createBtn " style={{ margin: '0 auto' }} onClick={registrationForm.handleSubmit(onSubmit)}>
                  Зарегистрироваться
                </Button>
              </div>
              {signUpError?.non_field_errors?.[0] && <p className="error pt-1 d-flex justify-content-center">{signUpError?.non_field_errors?.[0]}</p>}
            </div>
          </div>
        </div>
        <p class="mb-30 d-flex align-items-center justify-content-center">
          Уже есть аккаунт?&nbsp;
          <Link to="/login" class="color-primary">
            Войти
          </Link>
        </p>
        {signUpLoading && <Loading />}
      </div>
    </>
  );
};

export default RegistrationPage;
