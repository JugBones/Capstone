import React from 'react';
import ReactApexChart from 'react-apexcharts';
import '../styling/ParticipationRadarChart.css'; // Make sure the CSS is linked

class ParticipationRadarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: 'Student Participation',
        data: [80, 60, 70, 90],
      }],
      options: {
        chart: {
          height: 350,
          type: 'radar',
        },
        yaxis: {
          stepSize: 20,
        },
        xaxis: {
          categories: ['Video', 'Audio', 'Chat', 'Understanding'],
        },
        stroke: {
          width: 2,
        },
        fill: {
          opacity: 0.2,
        },
        markers: {
          size: 4,
        },
      },
    };
  }

  render() {
    return (
      <div className="participation-chart-container">
        <h3>Student Participation Radar Chart</h3>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="radar"
          height={350}
        />
        <button className="view-details-btn">View Details</button>
      </div>
    );
  }
}

export default ParticipationRadarChart;
