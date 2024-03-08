import React, { useEffect } from 'react';
import styles from './PricingPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { tariffGetList } from '../../../redux/actions/tariff/tariffGetList';
import Tariff from '../../../components/site/Tariff/Tariff';
import { Helmet } from 'react-helmet';
import Loading from '../../../components/site/Loading/Loading';
const PricingPage = () => {
  const dispatch = useDispatch();
  const {
    tariffGetList: { data: tariffList },
    tariffPayment: { data: tariffPaymentData, loading: tariffPaymentLoading },
  } = useSelector((state) => state.tariff);
  useEffect(() => {
    dispatch(tariffGetList());
  }, []);
  useEffect(() => {
    if (tariffPaymentData) {
      window.location.href = tariffPaymentData?.payment_link;
    }
  }, [tariffPaymentData]);

  return (
    <>
      <Helmet>
        <title>Тарифы</title>
      </Helmet>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12 mb-30 mt-30">
            <div class="card banner-feature banner-feature--5" style={{ background: '#00a5e0', minHeight: '180px' }}>
              <div class="banner-feature__shape">
                <img src="/img/svg/group3320.svg" alt="img" />
              </div>
              <div class="d-flex justify-content-center">
                <div class="card-body" style={{ paddingTop: '20px' }}>
                  <h1 class="banner-feature__heading color-white">Тарифы</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          {tariffList?.map((item, index) => (
            <Tariff {...item} color={item?.color ?? 'primary'} />
          ))}
        </div>
        {tariffPaymentLoading && <Loading />}
      </div>
    </>
  );
};

export default PricingPage;
