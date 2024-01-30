import React, { useEffect } from 'react';
import styles from './PricingPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { tariffGetList } from '../../../redux/actions/tariff/tariffGetList';
import Tariff from '../../../components/site/Tariff/Tariff';
const PricingPage = () => {
  const dispatch = useDispatch();
  const {
    tariffGetList: { data: tariffList },
  } = useSelector((state) => state.tariff);
  useEffect(() => {
    dispatch(tariffGetList());
  }, []);

  return (
    <>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb-main">
              <h4 class="text-capitalize breadcrumb-title">Тарифы</h4>
            </div>
          </div>
        </div>
        <div class="row">
          {tariffList?.map((item, index) => (
            <Tariff {...item} color={index == 0 ? 'primary' : 'secondary'} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PricingPage;
