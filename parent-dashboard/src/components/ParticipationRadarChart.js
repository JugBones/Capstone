import React from 'react';
import ReactApexChart from 'react-apexcharts';
import '../styling/ParticipationRadarChart.css'; 

class ParticipationRadarChart extends React.Component {
  constructor(props) {
    super(props);

this.state = {
  series: [{
    name: 'value',
    data: [80, 60, 70, 90],
  }],
  options: {
    chart: {
      height: 350,
      type: 'radar',
      toolbar: {
        show: false,
      },
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
    plotOptions: {
      radar: {
        polygons: {
          strokeColor: '#e9e9e9',
          fill: {
            colors: ['#f8f8f8', '#fff'],
          },
        },
      },
    },
    // Adjust the grid and margins
    grid: {
      padding: {
        top: 10,
        right: 20, // Add more space on the right
        bottom: 10,
        left: 30,  // Add more space on the left
      },
    },
  },
};

  }

  render() {
    return (
      <div className="participation-chart-container">
        <h3>Partisipasi Student</h3>
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
