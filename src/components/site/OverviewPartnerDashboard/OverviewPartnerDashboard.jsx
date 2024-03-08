import React, { useEffect, useState } from 'react';

import DashboardChart from '../DashboardChart/DashboardChart';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const customTooltips = function (context) {
  // Tooltip Element
  let tooltipEl = document.querySelector('.chartjs-tooltip');
  const container = context._chart.canvas.closest('.ninjadash-chart-container');
  if (container && !container.contains(tooltipEl)) {
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'chartjs-tooltip';
    tooltipEl.innerHTML = '<table></table>';

    document.querySelectorAll('.ninjadash-chart-container').forEach((el) => {
      if (el.contains(tooltipEl)) {
        tooltipEl.remove();
      }
    });

    container.appendChild(tooltipEl);
  }

  function getBody(bodyItem) {
    return bodyItem.lines;
  }

  if (tooltipEl !== null) {
    const tooltipModel = context.tooltip;
    // Hide if no tooltip
    if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
      tooltipEl.classList.add(tooltipModel.yAlign);
    } else {
      tooltipEl.classList.add('no-transform');
    }

    // Set Text
    if (tooltipModel.body) {
      const titleLines = tooltipModel.title || [];
      const bodyLines = tooltipModel.body.map(getBody);

      let innerHtml = '<thead>';

      titleLines.forEach(function (title) {
        innerHtml += `<div class='tooltip-title'>${title}</div>`;
      });
      innerHtml += '</thead><tbody>';

      bodyLines.forEach(function (body, i) {
        const colors = tooltipModel.labelColors[i];
        let style = `background:${colors.backgroundColor}`;
        style += `; border-color:${colors.borderColor}`;
        style += '; border-width: 2px';
        style += '; border-radius: 30px';
        const span = `<span class="chartjs-tooltip-key" style="${style}"></span>`;
        innerHtml += `<tr><td>${span}${body}</td></tr>`;
      });

      innerHtml += '</tbody>';

      const tableRoot = tooltipEl.querySelector('table');
      tableRoot.innerHTML = innerHtml;
    }

    const positionY = context._chart.canvas.offsetTop;
    const positionX = context._chart.canvas.offsetLeft;
    const toolTip = document.querySelector('.chartjs-tooltip');
    const toolTipHeight = toolTip.clientHeight;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = `${positionX + tooltipModel.caretX}px`;
    tooltipEl.style.top = `${positionY + tooltipModel.caretY - (tooltipModel.caretY > 10 ? (toolTipHeight > 100 ? toolTipHeight + 5 : toolTipHeight + 15) : 70)}px`;
    tooltipEl.style.fontFamily = tooltipModel.options.bodyFontFamily;
    tooltipEl.style.fontSize = `${tooltipModel.options.bodyFontSize}px`;
    tooltipEl.style.fontStyle = tooltipModel.options.bodyFontStyle;
    tooltipEl.style.padding = `${tooltipModel.yPadding}px ${tooltipModel.xPadding}px`;
  }
};
const OverviewPartnerDashboard = React.memo(() => {
  const {
    userStatisticMonth: { data: dataStatisticMonth, loading: loadingStatisticMonth, error: errorStatisticMonth },
  } = useSelector((state) => state.user);
  const [dataCommon, setDataCommon] = useState();
  const [dataSets, setDataSets] = useState();
  useEffect(() => {
    let labelDashboards = [];
    let totalRegistrations = [];
    let totalPurchases = [];
    let totalFirstPurchases = [];
    let totalRepeatPurchases = [];
    let sumRegistrations;
    let sumPurchases;
    let sumFirstPurchases;
    let sumRepeatPurchases;
    if (dataStatisticMonth) {
      dataStatisticMonth?.date_series_stats?.map((item, index) => {
        labelDashboards.push(index + 1);
        totalRegistrations.push(item?.total_registrations);
        totalPurchases.push(item?.total_purchases);
        totalFirstPurchases.push(item?.first_purchases);
        totalRepeatPurchases.push(item?.repeat_purchases);
      });
      sumRegistrations = totalRegistrations.reduce((partialSum, a) => partialSum + a, 0);
      sumPurchases = totalPurchases.reduce((partialSum, a) => partialSum + a, 0);
      sumFirstPurchases = totalFirstPurchases.reduce((partialSum, a) => partialSum + a, 0);
      sumRepeatPurchases = totalRepeatPurchases.reduce((partialSum, a) => partialSum + a, 0);
      const salesRevenueDatasets = [
        {
          data: totalRegistrations,
          borderColor: '#8231D3',
          borderWidth: 3,
          fill: true,
          backgroundColor: 'transparent',

          label: 'Кол-во регистраций',
          pointStyle: 'circle',
          pointRadius: '0',
          hoverRadius: '9',
          pointBorderColor: '#fff',
          pointBackgroundColor: '#8231D3',
          hoverBorderWidth: 5,
          amount: '$7,596',
          amountClass: 'current-amount',
          lineTension: 0.45,
        },

        {
          data: totalPurchases,
          borderColor: '#00AAFF',
          borderWidth: 3,
          fill: true,
          backgroundColor: 'transparent',

          label: 'Кол-во покупок',
          pointStyle: 'circle',
          pointRadius: '0',
          hoverRadius: '9',
          pointBorderColor: '#fff',
          pointBackgroundColor: '#00AAFF',
          hoverBorderWidth: 5,
          amount: '$7,596',
          amountClass: 'current-amount',
          lineTension: 0.45,
        },
        {
          data: totalFirstPurchases,
          borderColor: '#01B81A',
          borderWidth: 3,
          fill: true,
          backgroundColor: 'transparent',

          label: 'Первые оплаты',
          pointStyle: 'circle',
          pointRadius: '0',
          hoverRadius: '9',
          pointBorderColor: '#fff',
          pointBackgroundColor: '#01B81A',
          hoverBorderWidth: 5,
          amount: '$7,596',
          amountClass: 'current-amount',
          lineTension: 0.45,
        },
        {
          data: totalRepeatPurchases,
          borderColor: '#FA8B0C',
          borderWidth: 3,
          fill: true,
          backgroundColor: 'transparent',

          label: 'Повторные оплаты',
          pointStyle: 'circle',
          pointRadius: '0',
          hoverRadius: '9',
          pointBorderColor: '#fff',
          pointBackgroundColor: '#FA8B0C',
          hoverBorderWidth: 5,
          amount: '$7,596',
          amountClass: 'current-amount',
          lineTension: 0.45,
        },
      ];
      setDataCommon({ sumFirstPurchases, sumRepeatPurchases, sumRegistrations, sumPurchases, labels: labelDashboards });
      setDataSets(salesRevenueDatasets);
    } else {
      setDataCommon();
      setDataSets();
    }
  }, [dataStatisticMonth]);

  const SalesRevenueWrapper = styled.div`
    .ninjadash-sales-revenue-lineChart {
      margin: '0 0 0 -4px';
    }
    .ninjadash-chart-top {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: -12px;
      @media only screen and (max-width: 767px) {
        flex-direction: column;
        margin: -6px;
      }
    }
    #ninjadash-sales-revenue {
      margin-top: 12px;
    }
    .ninjadash-chart-top__item {
      position: relative;
      display: flex;
      align-items: center;
      margin: 12px;
      padding-left: 12px;
      @media only screen and (max-width: 767px) {
        margin: 6px;
      }
      &:before {
        position: absolute;
        width: 7px;
        height: 7px;
        left: 0;
        top: 50%;
        border-radius: 50%;
        content: '';
        transform: translateY(-50%);
      }
      &.ninjadash-chart-top__item-order {
        &:before {
          background-color: #00aaff;
        }
      }
      &.ninjadash-chart-top__item-sale {
        &:before {
          background-color: #8231d3;
        }
      }
      &.ninjadash-chart-top__item-third {
        &:before {
          background-color: #01b81a;
        }
      }
      &.ninjadash-chart-top__item-four {
        &:before {
          background-color: #fa8b0c;
        }
      }
      .ninjadash-chart-top__item--text {
        font-size: 14px;
        font-weight: 400;
        color: #333;
      }
      .ninjadash-chart-top__item--amount {
        display: inline-block;
        font-size: 22px;
        font-weight: 600;
        margin: 0 5px 0 10px;
        color: #000;
        @media only screen and (max-width: 767px) {
          font-size: 18px;
        }
      }
      .ninjadash-chart-top__item--status {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
        svg {
          height: 20px;
          width: 20px;
        }
        &.status-growth {
          color: green;
          svg {
            path {
              fill: green;
            }
          }
        }
        &.status-down {
          color: red;
          svg {
            path {
              fill: red;
            }
          }
        }
      }
    }
  `;
  const ChartContainer = styled.div`
    display: block;
    font-family: 'Jost', sans-serif;
    &.ninjadash-chart-pie {
      .chartjs-tooltip {
        padding: 4px !important;
        table tbody td {
          color: #000;
        }
      }
    }
    .chart-divider {
      display: block;
      width: 100%;
      height: 100px;
    }
    .chartjs-tooltip {
      opacity: 1;
      position: absolute;
      background: #fff;
      box-shadow: 0 3px 16px #adb5d915;
      padding: 8px 6px !important;
      border-radius: 5px;
      border: 1px solid #333;
      min-width: 80px;
      transition: all 0.5s ease;
      pointer-events: none;
      transform: translate(-50%, 5%);
      z-index: 222;
      top: 0;
      left: 0;
      @media only screen and (max-width: 991px) {
        transform: translate(-60%, 5%);
      }
      &:before {
        position: absolute;
        content: '';
        border-top: 5px solid #333;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        bottom: -5px;
        right: 50%;
        transform: translateX(-50%);
      }
    }
    .chartjs-tooltip-key {
      display: inline-block;
      width: 10px;
      height: 10px;
      background: 'pink';
      margin-right: 5px;
    }
    .tooltip-title {
      color: #333;
      font-size: 12px;
      line-height: 1;
      font-weight: 500 !important;
      font-family: 'Jost', sans-serif;
      text-transform: capitalize;
      margin-bottom: 4px;
    }
    .tooltip-value {
      color: #63b963;
      font-size: 22px;
      font-weight: 600 !important;
      font-family: 'Jost', sans-serif;
    }
    .tooltip-value sup {
      font-size: 12px;
      @media only screen and (max-width: 1199px) {
        font-size: 11px;
      }
    }
    table {
      tbody {
        td {
          font-size: 12px;
          font-weight: 500;
          padding-bottom: 3px;
          color: #333;
          .data-label {
            margin-left: 3px;
            color: #333;
          }
        }
      }
    }
  `;
  return (
    <>
      {dataSets && dataCommon && (
        <div class="card p-25 pt-0 mb-50" style={{ position: 'relative', overflow: 'hidden' }}>
          {' '}
          <SalesRevenueWrapper>
            <ChartContainer>
              {' '}
              <div className="ninjadash-chart-container ninjadash-sales-revenue-lineChart">
                <div class="card-header border-0 p-0">
                  <h3 style={{ fontSize: '18px', padding: '18px 0' }}>Ежедневная статистика</h3>
                </div>
                <div className="ninjadash-chart-top">
                  <div className="ninjadash-chart-top__item ninjadash-chart-top__item-sale">
                    <span className="ninjadash-chart-top__item--text">Кол-во регистраций</span>
                    <span className="ninjadash-chart-top__item--amount">{dataCommon?.sumRegistrations}</span>
                  </div>
                  <div className="ninjadash-chart-top__item ninjadash-chart-top__item-order">
                    <span className="ninjadash-chart-top__item--text">Кол-во покупок</span>
                    <span className="ninjadash-chart-top__item--amount">{dataCommon?.sumPurchases}</span>
                  </div>
                  <div className="ninjadash-chart-top__item ninjadash-chart-top__item-third">
                    <span className="ninjadash-chart-top__item--text">Первые оплаты</span>
                    <span className="ninjadash-chart-top__item--amount">{dataCommon?.sumFirstPurchases}</span>
                  </div>{' '}
                  <div className="ninjadash-chart-top__item ninjadash-chart-top__item-four">
                    <span className="ninjadash-chart-top__item--text">Повторные оплаты</span>
                    <span className="ninjadash-chart-top__item--amount">{dataCommon?.sumRepeatPurchases}</span>
                  </div>
                </div>
                <DashboardChart
                  type="line"
                  id="ninjadash-sales-revenue"
                  labels={dataCommon?.labels}
                  datasets={dataSets}
                  scales={{
                    y: {
                      grid: {
                        color: '#485e9029',
                        borderDash: [3, 3],
                        zeroLineColor: '#485e9029',
                        zeroLineWidth: 1,
                        zeroLineBorderDash: [3, 3],
                      },
                      ticks: {
                        beginAtZero: true,
                        fontSize: 13,
                        color: '#8C90A4',
                        suggestedMin: 50,
                        suggestedMax: 80,
                        stepSize: 20,
                        callback(label) {
                          return `${label}`;
                        },
                      },
                    },

                    x: {
                      grid: {
                        display: true,
                        zeroLineWidth: 1,
                        zeroLineColor: 'transparent',
                        color: 'transparent',
                        z: 1,
                        tickMarkLength: 0,
                      },
                      ticks: {
                        color: '#8C90A4',
                        padding: 10,
                      },
                    },
                  }}
                  tooltip={{
                    custom: customTooltips,
                    callbacks: {
                      // title() {
                      //   return `Total Revenue`;
                      // },

                      label(t) {
                        const { formattedValue, dataset } = t;
                        return `${dataset.label}: ${formattedValue} `;
                      },
                    },
                  }}
                  height={window.innerWidth <= 575 ? 175 : 100}
                />
              </div>
            </ChartContainer>{' '}
          </SalesRevenueWrapper>
          {loadingStatisticMonth && <Skeleton count={1} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />}
        </div>
      )}
      {errorStatisticMonth && <div style={{ color: 'var(--color-dark)', textTransform: 'uppercase', opacity: '0.4', fontSize: '20px', fontWeight: '700', textAlign: 'center', marginBottom: '75px', paddingTop: '50px' }}>Нет данных</div>}
    </>
  );
});

export default OverviewPartnerDashboard;
