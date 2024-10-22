import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ParticipationRadarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: 'Student Participation',
        data: [80, 60, 70, 90],  // Replace these values with actual participation data
      }],
      options: {
        chart: {
          height: 350,
          type: 'radar',
        },
        title: {
          text: 'Student Participation Radar Chart'
        },
        yaxis: {
          stepSize: 20,
        },
        xaxis: {
          categories: ['Video', 'Audio', 'Chat', 'Understanding'], // Corresponding to your metrics
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
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="radar"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ParticipationRadarChart;
