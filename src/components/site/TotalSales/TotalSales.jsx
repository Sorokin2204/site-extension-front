import React from 'react';
import DashboardChart from '../DashboardChart/DashboardChart';
const totalChartData = [
  {
    title: 'Sales',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct'],
    data: [20, 38, 30, 42, 38, 78, 60, 65, 50, 80],
    lineColor: '#760DFF',
    period: '10 Months',
    total: '8,550',
    status: 'growth',
    statusRate: '25.36',
  },
  {
    title: 'Orders',
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    data: [32, 20, 45, 35, 58, 56, 65],
    lineColor: '#01B81A',
    period: '7 Days',
    total: '950',
    status: 'growth',
    statusRate: '25.36',
  },
  {
    title: 'Subscribes',
    labels: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
    data: [40, 45, 38, 45, 35, 65, 55, 60],
    lineColor: '#FA8B0C',
    period: '8 Years',
    total: '8,550',
    status: 'down',
    statusRate: '25.36',
  },
];
const TotalLineChart = () => {
  return totalChartData?.map((item, i) => (
    <div class="col-xxl-4 col-lg-6 mb-25">
      <div class="card border-0 chartLine-po-details h-100">
        <div class="card-header border-bottom-0 px-25 pt-25 pb-30">
          <div class="chartLine-po-details__overview-content w-100">
            <div class=" chartLine-po-details__content d-flex flex-wrap justify-content-between">
              <div class="chartLine-po-details__titlebar">
                <h1>{item?.title}</h1>
              </div>
            </div>
            <div class="chartLine-po-details__time">
              <h5>${item?.total}</h5>
            </div>
          </div>
        </div>

        <div class="card-body">
          <div class="wp-chart">
            <div class="parentContainer">
              <DashboardChart
                labels={item.labels}
                id={`id_${i}`}
                datasets={[
                  {
                    data: item.data,
                    borderColor: item.lineColor,
                    borderWidth: 3,
                    fill: false,
                    pointBackgroundColor: '#FA8B0C',
                    pointBorderColor: '#fff',
                    pointHoverBorderColor: '#fff',
                    pointBorderWidth: 0,
                    pointHoverBorderWidth: 0,
                    pointHoverRadius: 0,
                    z: 5,
                  },
                ]}
                height={window.innerWidth <= 575 ? 200 : 180}
                tooltip={{
                  custom(tooltip) {
                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;
                  },
                  llbacks: {
                    title(t) {
                      const { label } = t[0];
                      return `${label}`;
                    },
                    label(t) {
                      const { formattedValue } = t;
                      return `  ${item.title}: ${formattedValue}k`;
                    },
                    labelColor() {
                      return {
                        backgroundColor: item.lineColor,
                        borderColor: 'transparent',
                      };
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default TotalLineChart;
