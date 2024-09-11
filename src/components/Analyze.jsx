import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const FollowerGainChart = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-09'); // Default month
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state

  // Function to fetch data for the selected month with error handling
  const fetchData = async (month) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/mydatabase/events?month=${month}`);
      const data = await response.json();

      // Filter data to include only those entries that match the selected month
      const filteredData = data.filter(item => item.month === parseInt(month.split('-')[1], 10));

      // Group data by platform
      const groupedData = filteredData.reduce((acc, item) => {
        if (!acc[item.title]) {
          acc[item.title] = { titles: [], followerGains: [], impressions: [] };
        }
        acc[item.title].titles.push(item.title);
        acc[item.title].followerGains.push(item["follower gain"]);
        acc[item.title].impressions.push(item.impressions);
        return acc;
      }, {});

      const newChartData = {};
      Object.keys(groupedData).forEach(platform => {
        newChartData[platform] = {
          labels: groupedData[platform].titles,
          datasets: [
            {
              label: 'Follower Gain',
              data: groupedData[platform].followerGains,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              yAxisID: 'y1',
            },
            {
              label: 'Impressions (Reach)',
              data: groupedData[platform].impressions,
              type: 'line',
              borderColor: 'rgba(255, 99, 132, 1)',
              fill: false,
              yAxisID: 'y2',
            },
          ],
        };
      });

      setChartData(newChartData);
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
      <div className="h-auto w-full flex flex-col items-center">
        <h2>Follower Gains and Impressions Across Platforms</h2>

        {/* Month Selector */}
        <label htmlFor="month">Select Month: </label>
        <input
          type="month"
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
        />

        {/* Loading indicator */}
        {isLoading && <p>Loading...</p>}

        {/* Error message */}
        {error && <p>Error: {error}</p>}

        {/* Charts */}
        <div className="flex flex-wrap justify-center">
          {!isLoading && !error && (
            <>
              {Object.keys(chartData).map((platform, index) => (
                <div
                  key={platform}
                  className="w-[45%] h-[400px] m-4" // Adjust width and height
                >
                  <h3 className="text-center">{platform}</h3>
                  <Line data={chartData[platform]} options={options} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FollowerGainChart;
