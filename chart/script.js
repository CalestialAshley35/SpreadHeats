const ctx = document.getElementById('myChart').getContext('2d');

// Initial chart setup
const myChart = new Chart(ctx, {
    type: 'line',  // Default chart type
    data: {
        labels: [],  // X-axis labels (auto-generated)
        datasets: [{
            label: 'Real-Time Data',
            data: [],  // Data points
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            },
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return 'Value: ' + tooltipItem.raw;
                    }
                }
            }
        }
    }
});

let count = 0;

// Function to add data to the chart
function addData() {
    const value = document.getElementById('value').value;
    if (value) {
        count++;
        // Add the new value to the chart's data and labels
        myChart.data.labels.push(count);  // X-axis is a counter
        myChart.data.datasets[0].data.push(parseFloat(value));  // Add the new data point
        myChart.update();  // Update the chart to reflect the new data
        document.getElementById('value').value = '';  // Clear the input field
    } else {
        alert("Please enter a value.");
    }
}

// Function to change chart type based on user selection
function changeChartType() {
    const selectedType = document.getElementById('chartType').value;
    myChart.config.type = selectedType;
    myChart.update();  // Re-render the chart with the new type
}

// Function to clear chart data
function clearData() {
    myChart.data.labels = [];
    myChart.data.datasets[0].data = [];
    myChart.update();  // Re-render the chart with empty data
    count = 0;
}
