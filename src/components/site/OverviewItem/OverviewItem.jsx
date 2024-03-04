import React from 'react';
import styles from './OverviewItem.module.scss';
const OverviewItem = ({ color = 'primary', value, label, icon = 'uil-shopping-cart-alt' }) => {
  return (
    <>
      <div class="col-xxl-3 col-sm-6 mb-25">
        <div class="ap-po-details ap-po-details--2 p-25 radius-xl d-flex justify-content-between">
          <div class="overview-content w-100">
            <div class=" ap-po-details-content d-flex flex-wrap justify-content-between">
              <div class="ap-po-details__titlebar">
                <h1>{value}</h1>
                <p>{label}</p>
              </div>
              <div class="ap-po-details__icon-area">
                <div class={`svg-icon order-bg-opacity-${color} color-${color}`}>
                  <i class={`uil ${icon}`}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewItem;
