import React, { useEffect } from 'react';
import styles from './AccountPage.module.scss';
import AccountLayout from '../../../components/site/AccountLayout/AccountLayout';
import { useForm } from 'react-hook-form';
import Input from '../../../components/site/Input/Input';
import Button from '../../../components/site/Button/Button';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '../../../components/site/Loading/Loading';
import { userUpdate } from '../../../redux/actions/user/userUpdate';
import { resetUserUpdate } from '../../../redux/slices/user.slice';
import { userAuth } from '../../../redux/actions/user/userAuth';
import { Helmet } from 'react-helmet';
const AccountPage = () => {
  const defaultValues = {
    email: '',
    fio: '',
  };

  const form = useForm({ defaultValues });
  const {
    userAuth: { data: userData },
    userProfile: { data: userProfile },
    userUpdate: { data: userUpdateData, loading: userUpdateLoading, error: userUpdateError },
  } = useSelector((state) => state.user);
  useEffect(() => {
    if (userData) {
      form.setValue('email', userData?.email);
      form.setValue('fio', `${userData?.first_name ?? ''}${userData?.first_name && userData?.last_name ? ' ' : ''}${userData?.last_name ?? ''}`);
    }
  }, [userData]);
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const fio = data?.fio?.split(' ');
    dispatch(
      userUpdate({
        first_name: fio[0],
        last_name: fio[1] ?? '',
      }),
    );
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (userUpdateData) {
      dispatch(resetUserUpdate());
      toast.success('Данные профиля обновлены');
      dispatch(userAuth());
    }
  }, [userUpdateData]);

  return (
    <>
      {' '}
      <Helmet>
        <title>Профиль</title>
      </Helmet>
      <div class="row justify-content-center">
        <div class="col-xxl-6">
          <div class="edit-profile__body mx-xl-20">
            {' '}
            <Input form={form} name={'fio'} label={'Имя Фамилия'} classWrap={'mb-20'} />
            <Input disabled form={form} name={'email'} label={'Почта'} classWrap={'mb-20'} />{' '}
            <div class="d-flex justify-content-between mt-1 align-items-center flex-wrap">
              <div class="text-capitalize py-10">
                {userProfile?.tariff_info ? (
                  <h6>Тариф «{userProfile?.tariff_info?.name}»</h6>
                ) : (
                  <h6 class="text-danger" style={{ textTransform: 'none' }}>
                    Тариф не указан <i class="uil uil-exclamation-circle"></i>
                  </h6>
                )}

                <span class="fs-13 color-light fw-400 " style={{ textTransform: 'none' }}>
                  Чтобы просмотреть все тарифы нажмите на кнопку "Посмотреть"
                </span>
              </div>
              <div class="my-sm-0 my-10 py-10">
                <Button
                  onClick={() => {
                    navigate('/pricing');
                  }}>
                  Посмотреть
                </Button>
              </div>
            </div>
            <div class="button-group d-flex pt-30 mb-15 justify-content-start" style={{ width: 'min-content', whiteSpace: 'nowrap' }}>
              <Button onClick={form.handleSubmit(onSubmit)} className="btn-squared me-15 text-capitalize btn-success">
                Сохранить
              </Button>
            </div>
          </div>
        </div>
        {userUpdateLoading && <Loading />}
      </div>
    </>
  );
};

export default AccountPage;
