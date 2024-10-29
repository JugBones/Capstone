import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { auth } from '../firebase';  // Import the Firebase auth instance
import '../styling/ParticipationRadarChart.css'; 

class ParticipationRadarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: 'Interactions',
        data: [0, 0, 0], // Initial dummy data, will be updated after fetching
      }],
      showModal: false, // To toggle modal visibility
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
          categories: ['Video', 'Audio', 'Chat'], // Removed "Understanding"
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
        grid: {
          padding: {
            top: 10,
            right: 20,
            bottom: 10,
            left: 30,
          },
        },
      },
    };
  }

  componentDidMount() {
    // Fetch data after user logs in
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;  // Get Firebase user ID
        this.fetchParticipationData(uid);
      }
    });
  }

  fetchParticipationData = async (uid) => {
    try {
      const response = await fetch(`http://localhost:8000/participation/${uid}`); // Your backend endpoint with uid
      const data = await response.json();
      
      if (data) {
        const chartData = [
          data.zoom_video || 0, 
          data.zoom_audio || 0, 
          data.zoom_chat || 0
        ];

        // Update the state with the fetched data
        this.setState({
          series: [{
            name: 'Interactions',
            data: chartData,
          }],
        });
      } else {
        console.error("No participation data available");
      }
    } catch (error) {
      console.error("Error fetching participation data:", error);
    }
  }

  handleViewDetails = () => {
    this.setState({ showModal: true });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { showModal, series } = this.state;
    const details = series[0].data;

    return (
      <div className="participation-chart-container">
        <h3>Partisipasi Student</h3>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="radar"
          height={350}
        />
        <button className="view-details-btn" onClick={this.handleViewDetails}>
          View Details
        </button>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={this.closeModal}>&times;</span>
              <h4>Participation Details</h4>
              <p>Zoom Video: {details[0]}</p>
              <p>Zoom Audio: {details[1]}</p>
              <p>Zoom Chat: {details[2]}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ParticipationRadarChart;
