import React from 'react';
import styles from './OverviewPage.module.scss';
import TotalLineChart from '../../../components/site/TotalSales/TotalSales';
import { useSelector } from 'react-redux';
import OverviewItem from '../../../components/site/OverviewItem/OverviewItem';
import { Helmet } from 'react-helmet';
const OverviewPage = () => {
  const {
    userProfile: { data: userProfile },
  } = useSelector((state) => state.user);
  return (
    <>
      {' '}
      <Helmet>
        <title>Главная</title>
      </Helmet>
      <div class="crm demo6 mb-25">
        <div class="container-fluid">
          <div class="row ">
            <div class="col-lg-12">
              <div class="breadcrumb-main">
                <h4 class="text-capitalize breadcrumb-title">Главная</h4>
              </div>
            </div>
            <div class="col-xxl-12 mb-25">
              <div class="card banner-feature--18 new d-flex bg-white">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-xl-6">
                      <div class="card-body px-25">
                        <h1 class="banner-feature__heading color-dark">Добро пожаловать на главную страницу</h1>
                        <p class="banner-feature__para color-dark">Изучайте подробную статистику и анализируйте динамику вашего тарифа с помощью наглядных графиков и диаграмм. Отслеживайте свои достижения и оптимизируйте свои расходы, используя все возможности личного кабинета.</p>
                        <div class="d-flex justify-content-sm-start justify-content-center"></div>
                      </div>
                    </div>
                    <div class="col-xl-6">
                      <div class="banner-feature__shape">
                        <img src="/img/banner.png" alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {userProfile?.tariff_info ? (
              userProfile?.tariff_info?.details?.map((item) => <OverviewItem value={item?.value} label={item?.display_text} color={item?.color} icon={item?.icon} />)
            ) : (
              <div class="card banner-feature banner-feature--2" style={{ background: 'var(--color-primary)' }}>
                <div class="banner-feature__shape">
                  <img src="img/svg/group9010.svg" alt="img" />
                </div>
                <div class="d-flex justify-content-center">
                  <div class="card-body">
                    <h1 class="banner-feature__heading color-white">Выберите тариф</h1>
                    <p class="banner-feature__para color-white">Чтобы пользоватся платформой, выберите подходящий вам тариф</p>
                    <button class="banner-feature__btn btn color-primary btn-md px-20 bg-white radius-xs fs-15" type="button">
                      Выбрать
                    </button>
                  </div>
                </div>
              </div>
            )}

            <TotalLineChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewPage;
