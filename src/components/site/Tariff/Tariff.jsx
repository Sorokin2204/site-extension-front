import React from 'react';
import styles from './Tariff.module.scss';
const Tariff = ({ color = 'primary', name, details }) => {
  return (
    <>
      {' '}
      <div class="col-xxl-3 col-lg-4 col-sm-6 mb-30">
        <div class="card h-100">
          <div class="card-body p-30">
            <div class="pricing d-flex align-items-center">
              <span class={`pricing__tag color-${color} order-bg-opacity-${color} rounded-pill `}>{name}</span>
            </div>
            <div class="pricing__price rounded">
              <p class="pricing_value display-3 color-dark d-flex align-items-center text-capitalize fw-600 mb-1">
                <sup>$</sup>39
                <small class="pricing_user">Per month</small>
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
            <button disabled class={`btn btn-${color} btn-default btn-squared text-capitalize px-30`}>
              Перейти
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tariff;
