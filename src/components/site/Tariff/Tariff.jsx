import React from 'react';
import styles from './Tariff.module.scss';
import { currencyFormat } from '../../../utils/currencyFormat';
const Tariff = ({ color = 'primary', price, name, details }) => {
  return (
    <>
      {' '}
      <div class="col-xxl-3 col-lg-4 col-sm-6 mb-30">
        <div class="card h-100">
          <div class="card-body p-30">
            <div class="pricing d-flex align-items-center">
              <span class={`pricing__tag color-${color?.toLowerCase()} order-bg-opacity-${color?.toLowerCase()} rounded-pill `}>{name}</span>
            </div>
            <div class="pricing__price rounded">
              <p class="pricing_value display-3 color-dark d-flex align-items-center text-capitalize fw-600 mb-1">
                {currencyFormat(price)} <sup>₸</sup>
                <small class="pricing_user" style={{ textTransform: 'none' }}>
                  в месяц
                </small>
              </p>
            </div>
            <div class="pricing__features">
              <ul>
                {details?.map((item) => (
                  <li>
                    <span class="fa fa-check"></span>
                    {item?.value} {item?.display_text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div class="price_action d-flex pb-30 ps-30">
            <button class={`btn btn-${color?.toLowerCase()} btn-default btn-squared text-capitalize px-30`}>Перейти</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tariff;
