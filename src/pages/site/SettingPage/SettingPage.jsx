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
import { resetUserProfileUpdate, resetUserUpdate } from '../../../redux/slices/user.slice';
import { userAuth } from '../../../redux/actions/user/userAuth';
import { userProfileUpdate } from '../../../redux/actions/user/userProfileUpdate';
import { userProfile } from '../../../redux/actions/user/userProfile';
const SettingPage = () => {
  const defaultValues = {
    login_kaspi: '',
    password_kaspi: '',
    id_store: '',
  };
  const form = useForm({ defaultValues });
  const {
    userProfile: { data: userData },
    userProfileUpdate: { data: userUpdateData, loading: userUpdateLoading, error: userUpdateError },
  } = useSelector((state) => state.user);
  useEffect(() => {
    if (userData) {
      form.setValue('login_kaspi', userData?.login_kaspi);
      form.setValue('password_kaspi', userData?.password_kaspi);
      form.setValue('id_store', userData?.id_store);
    }
  }, [userData]);
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(
      userProfileUpdate({
        login_kaspi: data?.login_kaspi,
        password_kaspi: data?.password_kaspi,
        id_store: data?.id_store,
      }),
    );
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (userUpdateData) {
      dispatch(resetUserProfileUpdate());
      toast.success('Настройки обновлены');
      dispatch(userProfile());
    }
  }, [userUpdateData]);
  return (
    <>
      {' '}
      <div class="row justify-content-center">
        <div class="col-xxl-6">
          <div class="edit-profile__body mx-xl-20">
            {' '}
            <Input form={form} name={'login_kaspi'} label={'Логин'} classWrap={'mb-20'} />
            <Input form={form} name={'password_kaspi'} label={'Пароль'} classWrap={'mb-20'} type="password" />
            <Input form={form} label={'ID магазина'} classWrap={'mb-20'} name={'id_store'} />
            <div class="button-group d-flex pt-30 mb-15 justify-content-start" style={{ width: 'min-content', whiteSpace: 'nowrap' }}>
              <Button className="btn-squared me-15 text-capitalize btn-success" onClick={form.handleSubmit(onSubmit)}>
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingPage;
