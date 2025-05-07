import React from "react";
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  BarChart,
  Bar,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import "../css/Analytics.css";

const trafficSignalsData = [
  { name: "Good", value: 60 },
  { name: "Fair", value: 30 },
  { name: "Poor", value: 10 },
];

const trafficSignalsData_condition = [
  { month: "Jan", Good: 50, Fair: 30, Poor: 10 },
  { month: "Feb", Good: 45, Fair: 35, Poor: 15 },
  { month: "Mar", Good: 40, Fair: 38, Poor: 22 },
  { month: "Apr", Good: 38, Fair: 30, Poor: 28 },
  { month: "May", Good: 35, Fair: 28, Poor: 35 },
];

const trafficSignsData = [
  { name: "Good", value: 85 },
  { name: "Fair", value: 50 },
  { name: "Poor", value: 30 },,
];


const trafficSignsData_condition = [
  { month: "Jan", Good: 40, Fair: 30, Poor: 35 },
  { month: "Feb", Good: 45, Fair: 50, Poor: 30 },
  { month: "Mar", Good: 50, Fair: 38, Poor: 28 },
  { month: "Apr", Good: 58, Fair: 45, Poor: 40 },
  { month: "May", Good: 70, Fair: 52, Poor: 26 },
];

const pavementMarkingsData = [
  { name: "Good", value: 100 },
  { name: "Fair", value: 40 },
  { name: "Poor", value: 60 },,
];

const pavementMarkingsDistribution_condition = [
  { month: "Jan", Good: 50, Fair: 30, Poor: 20 },
  { month: "Feb", Good: 60, Fair: 35, Poor: 26 },
  { month: "Mar", Good: 70, Fair: 50, Poor: 24 },
  { month: "Apr", Good: 55, Fair: 60, Poor: 20 },
  { month: "May", Good: 60, Fair: 42, Poor: 15 },
];

const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F"];
function AnalyticsPage() {
  return (
    <div className="innovative-analytics-page">
      {/* Header */}
      <header className="innovative-header">
        <h1>Asset Analytics</h1>
        <p>Insights at Your Fingertips!</p>
      </header>
      {/* Traffic Signals Section */}
      <section className="analytics-section">
        <div className="section-header">
          <h2>Traffic Signals</h2>
        </div>
        <div className="analytics-cards">
          <div className="card interactive-card">
            <h3>Condition Distribution</h3>
            <PieChart width={310} height={310}>
              <Pie
                data={trafficSignalsData}
                dataKey="value"
                outerRadius={120}
                label
              >
                <Cell fill="#0088FE" />
                <Cell fill="#00C49F" />
                <Cell fill="#FFBB28" />
              </Pie>
              <Tooltip />
              <Legend  layout="vertical" align="right" verticalAlign="middle"  wrapperStyle={{ right: -80 }}/>
            </PieChart>
          </div>
          <div className="card interactive-card">
            <h3>Condition Trends Over Time</h3>
            <LineChart width={450} height={250} data={trafficSignalsData_condition}>
            <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              
              <Line type="monotone" dataKey="Good" stroke="#0088FE" name="Good" />
              <Line type="monotone" dataKey="Fair" stroke="#00C49F" name="Fair" />
              <Line type="monotone" dataKey="Poor" stroke="#FFBB28" name="Poor" />
              <Legend layout="vertical" align="right" verticalAlign="middle"  wrapperStyle={{ right: -80 }}  />
            </LineChart>
          </div>
        </div>
      </section>

      {/* Traffic Signs Section */}
      <section className="analytics-section">
        <div className="section-header">
          <h2>Traffic Signs</h2>
        </div>
        <div className="analytics-cards">
          <div className="card interactive-card">
            <h3>Condition Distribution</h3>
            <PieChart width={310} height={310}>
              <Pie
                data={trafficSignsData}
                dataKey="value"
                outerRadius={120}
                label
              >
                <Cell fill="#0088FE" />
                <Cell fill="#00C49F" />
                <Cell fill="#FFBB28" />
              </Pie>
              <Tooltip />
              <Legend  layout="vertical" align="right" verticalAlign="middle"  wrapperStyle={{ right: -80 }}/>
            </PieChart>
          </div>
          <div className="card interactive-card">
            <h3>Condition Trends Over Time</h3>
            <LineChart width={450} height={250} data={trafficSignsData_condition}>
            <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              
              <Line type="monotone" dataKey="Good" stroke="#0088FE" name="Good" />
              <Line type="monotone" dataKey="Fair" stroke="#00C49F" name="Fair" />
              <Line type="monotone" dataKey="Poor" stroke="#FFBB28" name="Poor" />
              <Legend layout="vertical" align="right" verticalAlign="middle"  wrapperStyle={{ right: -80 }}  />
            </LineChart>
          </div>
        </div>
      </section>

      {/* Pavement Markings Section */}
      <section className="analytics-section">
        <div className="section-header">
          <h2>Pavement Markings</h2>
        </div>
        <div className="analytics-cards">
          <div className="card interactive-card">
            <h3>Condition Distribution</h3>
            <PieChart width={330} height={310}>
              <Pie
                data={pavementMarkingsData}
                dataKey="value"
                outerRadius={120}
                label
              >
                <Cell fill="#0088FE" />
                <Cell fill="#00C49F" />
                <Cell fill="#FFBB28" />
              </Pie>
              <Tooltip />
              <Legend  layout="vertical" align="right" verticalAlign="middle"  wrapperStyle={{ right: -80 }}/>
            </PieChart>
          </div>
          <div className="card interactive-card">
            <h3>Condition Trends Over Time</h3>
            <LineChart width={450} height={250} data={pavementMarkingsDistribution_condition}>
            <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              
              <Line type="monotone" dataKey="Good" stroke="#0088FE" name="Good" />
              <Line type="monotone" dataKey="Fair" stroke="#00C49F" name="Fair" />
              <Line type="monotone" dataKey="Poor" stroke="#FFBB28" name="Poor" />
              <Legend layout="vertical" align="right" verticalAlign="middle"  wrapperStyle={{ right: -80 }}  />
            </LineChart>
    </div>
        </div>
      </section>
    </div>
  );
}

export default AnalyticsPage;
