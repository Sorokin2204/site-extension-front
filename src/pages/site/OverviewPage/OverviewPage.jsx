import React, { useEffect } from 'react';
import styles from './OverviewPage.module.scss';
import TotalLineChart from '../../../components/site/TotalSales/TotalSales';
import { useDispatch, useSelector } from 'react-redux';
import OverviewItem from '../../../components/site/OverviewItem/OverviewItem';
import { Helmet } from 'react-helmet';
import { userStatistics } from '../../../redux/actions/user/userStatistics';
import { userStatisticMonth } from '../../../redux/actions/user/userStatisticMonth';
import OverviewMonth from '../OverviewMonth/OverviewMonth';
import OverviewPartnerDashboard from '../../../components/site/OverviewPartnerDashboard/OverviewPartnerDashboard';
import { currencyFormat } from '../../../utils/currencyFormat';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const OverviewPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userStatistics());
  }, []);

  const {
    userProfile: { data: userProfile },
    userStatistics: { data: dataUserStatistics, loading: loadingUserStatistics },
  } = useSelector((state) => state.user);
  return (
    <>
      {userProfile?.partner && (
        <>
          {' '}
          <div class="crm demo6 " style={{ marginBottom: '35px' }}>
            <div class="container-fluid">
              <div class="row ">
                <div class="col-lg-12">
                  <div class="breadcrumb-main justify-content-center mb-20">
                    <h4 class=" breadcrumb-title text-center">Общая статистика</h4>
                  </div>
                </div>{' '}
              </div>
              <div className="row" style={{ rowGap: '24px' }}>
                <div className="col-6 col-lg-3 col-md-4">
                  <div class="overview-content products-awards pt-20 pb-20 text-center radius-xl" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div class="d-inline-flex flex-column align-items-center justify-content-center">
                      <div class="d-flex align-items-start flex-wrap">
                        <div>
                          <p class="mb-1 mb-0 color-gray" style={{ marginTop: 0 }}>
                            Количество оплат
                          </p>
                          <h1>{currencyFormat(dataUserStatistics?.referral_purchases)}</h1>
                        </div>
                      </div>
                    </div>{' '}
                    {(!dataUserStatistics || loadingUserStatistics) && <Skeleton count={1} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />}
                  </div>
                </div>{' '}
                <div className="col-6 col-lg-3 col-md-4">
                  <div class="overview-content products-awards pt-20 pb-20 text-center radius-xl" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div class="d-inline-flex flex-column align-items-center justify-content-center">
                      <div class="d-flex align-items-start flex-wrap">
                        <div>
                          <p class="mb-1 mb-0 color-gray" style={{ marginTop: 0 }}>
                            Количество регистраций
                          </p>
                          <h1>{currencyFormat(dataUserStatistics?.referral_count)}</h1>
                        </div>
                      </div>
                    </div>
                    {(!dataUserStatistics || loadingUserStatistics) && <Skeleton count={1} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />}
                  </div>
                </div>{' '}
                <div className="col-6 col-lg-3 col-md-4">
                  <div class="overview-content products-awards pt-20 pb-20 text-center radius-xl" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div class="d-inline-flex flex-column align-items-center justify-content-center">
                      <div class="d-flex align-items-start flex-wrap">
                        <div>
                          <p class="mb-1 mb-0 color-gray" style={{ marginTop: 0 }}>
                            Итоговая комиссия
                          </p>
                          <h1>{currencyFormat(dataUserStatistics?.total_earnings)}</h1>
                        </div>
                      </div>
                    </div>
                    {(!dataUserStatistics || loadingUserStatistics) && <Skeleton count={1} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />}
                  </div>
                </div>{' '}
                <div className="col-6 col-lg-3 col-md-4">
                  <div class="overview-content products-awards pt-15 pb-15 text-center radius-xl" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div class="d-inline-flex flex-column align-items-center justify-content-center">
                      <div class="d-flex align-items-start flex-wrap">
                        <div>
                          <p class="mb-1 mb-0 color-gray" style={{ marginTop: 0 }}>
                            Условия
                          </p>
                          <h6>1-ая оплата — 30%</h6>
                          <h6 style={{ marginTop: '2px' }}>после — 20%</h6>
                        </div>
                      </div>
                    </div>
                    {(!dataUserStatistics || loadingUserStatistics) && <Skeleton count={1} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <OverviewMonth />
          <OverviewPartnerDashboard />
        </>
      )}

      <Helmet>
        <title>Главная</title>
      </Helmet>
      <div class="crm demo6 mb-25">
        <div class="container-fluid">
          <div class="row ">
            <div class="col-lg-12">
              <div class="breadcrumb-main" style={{ marginTop: 0 }}>
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

            {/* <TotalLineChart /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewPage;
