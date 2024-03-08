import React, { useEffect, useState } from 'react';
import styles from './OverviewMonth.module.scss';
import moment from 'moment/moment';
import 'moment/locale/ru';
import { userStatisticMonth } from '../../../redux/actions/user/userStatisticMonth';
import { useDispatch, useSelector } from 'react-redux';
import { currencyFormat } from '../../../utils/currencyFormat';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
moment.locale('ru');
const OverviewMonth = () => {
  const dispatch = useDispatch();
  const {
    userStatisticMonth: { data: dataStatisticMonth, loading: loadingStatisticMonth },
  } = useSelector((state) => state.user);

  const [statsticFormat, setStatsticFormat] = useState([]);
  const [activeMonth, setActiveMonth] = useState(moment().format('YYYY-MM').toString());
  useEffect(() => {
    dispatch(userStatisticMonth(activeMonth));
  }, [activeMonth]);
  useEffect(() => {
    if (dataStatisticMonth) {
      let statsticFormatData = [];
      statsticFormatData.push({ label: 'Кол-во регистрации', value: dataStatisticMonth.user_stats.total_registrations });
      statsticFormatData.push({ label: 'Первые оплаты', value: dataStatisticMonth.user_stats.first_purchases });
      statsticFormatData.push({ label: 'Повторные оплаты', value: dataStatisticMonth.user_stats.repeat_purchases });
      statsticFormatData.push({ label: 'Комиссия первой оплаты', value: dataStatisticMonth.user_stats.first_purchase_earnings });
      statsticFormatData.push({ label: 'Комиссия повторной оплаты', value: dataStatisticMonth.user_stats.repeat_purchase_earnings });
      statsticFormatData.push({ label: 'Итоговая комиссия', value: dataStatisticMonth.user_stats.total_earnings });
      setStatsticFormat(statsticFormatData);
    } else {
      setStatsticFormat([]);
    }
  }, [dataStatisticMonth]);

  return (
    <>
      <div className="">
        <div class="container-fluid">
          <div class="row " style={{ marginBottom: '25px' }}>
            <div class="col-lg-12">
              <div class="d-flex justify-content-between align-items-center">
                {' '}
                <div
                  className=""
                  style={{ cursor: activeMonth == '2024-01' ? 'auto' : 'pointer', opacity: activeMonth == '2024-01' ? 0.2 : 1 }}
                  onClick={() => {
                    if (activeMonth !== '2024-01') {
                      setActiveMonth(moment(activeMonth).subtract(1, 'months').format('YYYY-MM').toString());
                    }
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#0a0a0a">
                    <path d="M8.5,12.8l5.7,5.6c0.4,0.4,1,0.4,1.4,0c0,0,0,0,0,0c0.4-0.4,0.4-1,0-1.4l-4.9-5l4.9-5c0.4-0.4,0.4-1,0-1.4c-0.2-0.2-0.4-0.3-0.7-0.3c-0.3,0-0.5,0.1-0.7,0.3l-5.7,5.6C8.1,11.7,8.1,12.3,8.5,12.8C8.5,12.7,8.5,12.7,8.5,12.8z"></path>
                  </svg>
                </div>
                <div class="d-flex align-items-center">
                  {' '}
                  <h3 class="text-capitalize breadcrumb-title text-center">{moment(activeMonth).format('MMMM')}</h3>
                  <h6 class="text-capitalize breadcrumb-title text-center" style={{ marginTop: '-8px', marginLeft: '5px', fontSize: '14px', opacity: 0.5 }}>
                    {moment(activeMonth).format('YYYY')}
                  </h6>
                </div>
                <div
                  className=""
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setActiveMonth(moment(activeMonth).add(1, 'months').format('YYYY-MM').toString());
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#0a0a0a">
                    <path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {statsticFormat?.length !== 0 && (
            <div class="row justify-content-center mb-50" style={{ rowGap: '24px' }}>
              {statsticFormat?.map((item) => (
                <div class="col-3" style={{ minWidth: '240px' }}>
                  <div class="overview-content products-awards pt-20 pb-20 text-center radius-xl" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div class="d-inline-flex flex-column align-items-center justify-content-center">
                      <div class="d-flex align-items-start flex-wrap">
                        <div>
                          <p class="mb-1 mb-0 color-gray" style={{ marginTop: '0px' }}>
                            {item?.label}
                          </p>
                          <h1>{currencyFormat(item?.value)}</h1>
                        </div>
                      </div>
                    </div>
                    {loadingStatisticMonth && <Skeleton count={1} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OverviewMonth;
