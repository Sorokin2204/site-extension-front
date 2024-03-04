import React, { useEffect } from 'react';
import AccountLayout from '../../../components/site/AccountLayout/AccountLayout';
import { useForm } from 'react-hook-form';
import Input from '../../../components/site/Input/Input';
import Button from '../../../components/site/Button/Button';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '../../../components/site/Loading/Loading';
import { userUpdate } from '../../../redux/actions/user/userUpdate';
import { resetUserProfileUpdate, resetUserUpdate, resetUserUpdatePassword } from '../../../redux/slices/user.slice';
import { userAuth } from '../../../redux/actions/user/userAuth';
import { userProfileUpdate } from '../../../redux/actions/user/userProfileUpdate';
import { userProfile } from '../../../redux/actions/user/userProfile';
import { userUpdatePassword } from '../../../redux/actions/user/userUpdatePassword';
import { Helmet } from 'react-helmet';
const ResetPasswordPage = () => {
  const defaultValues = {
    old_password: '',
    new_password1: '',
    new_password2: '',
  };
  const form = useForm({ defaultValues });
  const {
    userUpdatePassword: { data: userUpdateData, loading: userUpdateLoading, error: userUpdateError },
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(userUpdatePassword(data));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (userUpdateData) {
      dispatch(resetUserUpdatePassword());
      toast.success('Пароль успешно изменен');
      form.reset();
    }
  }, [userUpdateData]);
  useEffect(() => {
    if (userUpdateError) {
      Object.keys(userUpdateError).forEach(function (key, index) {
        if (key !== 'non_field_errors') {
          form.setError(key, { type: 'custom', message: userUpdateError[key] });
        }
      });
    }
  }, [userUpdateError]);
  return (
    <>
      <Helmet>
        <title>Смена пароля</title>
      </Helmet>{' '}
      <div class="row justify-content-center">
        <div class="col-xxl-6">
          <div class="edit-profile__body mx-xl-20">
            {' '}
            <Input form={form} name={'old_password'} label={'Старый пароль'} type="password" classWrap={'mb-20'} />
            <Input
              form={form}
              name={'new_password1'}
              label={'Новый пароль'}
              type="password"
              classWrap={'mb-20'}
              rules={{
                required: { message: 'Обязательное поле', value: true },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/i,
                  message: 'Пароль должен содержать минимум: \n - Одну заглавную букву \n- Одну маленькую букву \n- Одну цифру \n- Длинну более 8 символов ',
                },
              }}
            />
            <Input
              form={form}
              name={'new_password2'}
              label={'Повторный новый пароль'}
              classWrap={'mb-20'}
              type="password"
              rules={{
                required: { message: 'Обязательное поле', value: true },
                validate: (val) => {
                  if (form.watch('new_password1') != val) {
                    return 'Пароли не совпадают';
                  }
                },
              }}
            />{' '}
            <div class="button-group d-flex pt-30 mb-15 justify-content-start" style={{ width: 'min-content', whiteSpace: 'nowrap' }}>
              <Button className="btn-squared me-15 text-capitalize btn-success" onClick={form.handleSubmit(onSubmit)}>
                Изменить пароль
              </Button>
            </div>
          </div>
        </div>
        {userUpdateLoading && <Loading />}
      </div>
    </>
  );
};

export default ResetPasswordPage;
