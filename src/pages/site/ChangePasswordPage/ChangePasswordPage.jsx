import React, { useEffect } from 'react';
import styles from './ChangePasswordPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userResetPassword } from '../../../redux/actions/user/userResetPassword';
import { resetUserResetPassword } from '../../../redux/slices/user.slice';
import Input from '../../../components/site/Input/Input';
import Button from '../../../components/site/Button/Button';
import Loading from '../../../components/site/Loading/Loading';
const ChangePasswordPage = () => {
  const defaultValues = {};
  const form = useForm({ defaultValues });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    userResetPassword: { data: userResetPasswordData, error: userResetPasswordError, loading: userResetPasswordLoading },
  } = useSelector((state) => state.user);
  const onSubmit = (data) => {
    dispatch(userResetPassword(data));
  };
  useEffect(() => {
    if (userResetPasswordData) {
      dispatch(resetUserResetPassword());
      navigate('/password-sent');
    }
  }, [userResetPasswordData]);
  useEffect(() => {
    return () => {
      dispatch(resetUserResetPassword());
    };
  }, []);

  useEffect(() => {
    if (userResetPasswordError) {
      Object.keys(userResetPasswordError).forEach(function (key, index) {
        if (key !== 'non_field_errors') {
          form.setError(key, { type: 'custom', message: userResetPasswordError[key]?.[0] });
        }
      });
    }
  }, [userResetPasswordError]);
  return (
    <>
      {' '}
      <div class="card border-0">
        <div class="card-header">
          <div class="edit-profile__title">
            <h4>Восстановления пароля</h4>
          </div>
        </div>
        <div class="card-body">
          <div class="edit-profile__body">
            <p>Enter the email address you used when you joined and we’ll send you instructions to reset your password.</p>
            <Input form={form} name={'email'} label={'Email'} classWrap={'mb-20'} />
            <div class="d-flex">
              <Button className="btn-squared text-capitalize lh-normal px-md-50 py-15 signIn-createBtn" onClick={form.handleSubmit(onSubmit)}>
                Сбросить пароль
              </Button>
            </div>
          </div>
          <div class="button-group d-flex align-items-center justify-content-start mt-25 pb-30">
            <p class="mb-0">
              Return to&nbsp;
              <Link to="/login" class="color-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        {userResetPasswordLoading && <Loading />}
      </div>
    </>
  );
};

export default ChangePasswordPage;
