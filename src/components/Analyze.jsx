import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { PI } from 'chart.js/helpers';

Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const FollowerGainChart = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-09'); // Default month
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const fetchData = async (month) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/mydatabase/events?month=${month}`);
      const data = await response.json();

      // Filter data to include only those entries that match the selected month
      const filteredData = data.filter(item => item.month === parseInt(month.split('-')[1], 10));

      // Validate filtered data
      if (!Array.isArray(filteredData) || filteredData.length === 0) {
        throw new Error('No data available for the selected month');
      }

      setChartData({
        labels: filteredData.map(item => item.title),
        datasets: [
          {
            label: 'Follower Gain',
            data: filteredData.map(item => item["follower gain"]),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            yAxisID: 'y1',
          },
          {
            label: 'Impressions (Reach)',
            data: filteredData.map(item => item.impressions),
            type: 'line',
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false,
            yAxisID: 'y2',
          },
        ],
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  // Function to handle month change
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value); // Update the selected month
  };

  useEffect(() => {
    fetchData(selectedMonth);
  }, [selectedMonth]); // Re-fetch data when the selected month changes

  const options = {
    scales: {
      y1: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Follower Gain',
        },
      },
      y2: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Impressions (Reach)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <>
    <div className='flex gap-10 justify-center'>
    <div className='h-96 w-[600px]'>
      <h2 className='ml-10 font-bold'>Follower Gains and Impressions Across Platforms</h2>

      {/* Month Selector */}
      <div className='ml-10'>
      <label htmlFor="month">Select Month: </label>
      <input
        type="month"
        id="month"
        value={selectedMonth}
        onChange={handleMonthChange}
      />
        </div>
      {/* Loading indicator */}
      {isLoading && <p>Loading...</p>}

      {/* Error message */}
      {error && <p>Error: {error}</p>}

      {/* Chart */}
      {!isLoading && !error && (
        <Line data={chartData} options={options} />
      )}
    </div>

    <div className='h-96 w-[600px]'>
      <h2 className='ml-10 font-bold'>Follower Gains and Impressions Across Platforms</h2>

      {/* Month Selector */}
      <div className='ml-10'>
      <label htmlFor="month">Select Month: </label>
      <input
        type="month"
        id="month"
        value={selectedMonth}
        onChange={handleMonthChange}
      />
        </div>
      {/* Loading indicator */}
      {isLoading && <p>Loading...</p>}

      {/* Error message */}
      {error && <p>Error: {error}</p>}

      {/* Chart */}
      {!isLoading && !error && (
        <Bar data={chartData} options={options} />
      )}
    </div>
    </div>
    </>
  );
};

export default FollowerGainChart;
