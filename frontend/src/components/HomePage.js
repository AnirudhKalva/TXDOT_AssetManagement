import React from "react";
import { PieChart, Pie, LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell } from "recharts";
import { Link } from "react-router-dom";
import "../css/HomePage.css";

const assetDistribution = [
  { name: "Traffic Signals", value: 40 },
  { name: "Traffic Signs", value: 30 },
  { name: "Pavement Markings", value: 30 },
];

const assetConditions = [
  { month: "Jan", Good: 60, Fair: 30, Poor: 10 },
  { month: "Feb", Good: 73, Fair: 55, Poor: 23 },
  { month: "Mar", Good: 50, Fair: 60, Poor: 15 },
];

const regionData = [
  { region: "Houston", assets: 15 },
  { region: "Dallas", assets: 20 },
  { region: "Austin", assets: 25 },
  { region: "San Antonio", assets: 30 },
];

// const radarData = [
//   { metric: "Maintenance", value: 80 },
//   { metric: "Repair Costs", value: 70 },
//   { metric: "Average Age", value: 60 },
//   { metric: "Condition Rating", value: 85 },
// ];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

function HomePage() {
  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <header className="hero-section">
        <h1>Welcome to the Transport Asset Management Tool</h1>
        <p>Your one-stop solution for monitoring and managing traffic infrastructure.</p>
        <Link to="/map" className="cta-button">Explore Map</Link>
      </header>

      {/* Analytics Section */}
      <section className="analytics-section">
        <h2>Advanced Analytics</h2>

        {/* Pie Chart */}
        <div className="chart-container">
          <h3>Asset Distribution</h3>
          <PieChart width={500} height={350}>
            <Pie
              data={assetDistribution}
              dataKey="value"
              outerRadius={120}
              label
            >
              {assetDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend  />
          </PieChart>
        </div>

        {/* Line Chart */}
        <div className="chart-container">
          <h3>Condition Trends Over Time</h3>
          <LineChart width={500} height={350} data={assetConditions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Good" stroke="#00C49F" />
            <Line type="monotone" dataKey="Fair" stroke="#FFBB28" />
            <Line type="monotone" dataKey="Poor" stroke="#FF8042" />
          </LineChart>
        </div>

        {/* Bar Chart */}
        <div className="chart-container">
          <h3>Assets by City</h3>
          <BarChart width={500} height={350} data={regionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="assets" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Radar Chart */}

      </section>

      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature">
            <h3>Real-Time Monitoring</h3>
            <p>Get live updates on traffic signals and road infrastructure.</p>
          </div>
          <div className="feature">
            <h3>Data-Driven Insights</h3>
            <p>Analyze asset conditions to make informed decisions.</p>
          </div>
          <div className="feature">
            <h3>Easy Navigation</h3>
            <p>Navigate seamlessly between data and visualization tools.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        <p>&copy; 2025 Transport Asset Management Tool. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
