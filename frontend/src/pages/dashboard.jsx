import { useState, useEffect } from "react";
import API from "../api";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [ticker, setTicker] = useState("");
  const [result, setResult] = useState(null);
  const location = useLocation();

  // 🔹 Fetch data function
  const fetchData = async (symbol) => {
    try {
      const res = await API.post("predict/", { ticker: symbol });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed");
    }
  };

  // 🔹 Auto-load when coming from history page
  useEffect(() => {
    if (location.state?.ticker) {
      setTicker(location.state.ticker);
      fetchData(location.state.ticker);
    }
  }, [location.state]);

  return (
    <Layout>
      {/* 🔍 SEARCH */}
      <div className="flex gap-4 mb-6">
        <input
          placeholder="Search stock (AAPL, AMZN...)"
          className="p-3 border rounded-lg flex-1"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <button
          onClick={() => fetchData(ticker)}
          className="bg-indigo-600 text-white px-6 rounded-lg"
        >
          Search
        </button>
      </div>

      {/* 📊 TOP CARDS */}
      {result && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card
            label="Next Price"
            value={result.next_day_price ?? result.metrics?.next_day_price}
          />
          <Card
            label="MSE"
            value={result.mse ?? result.metrics?.mse}
          />
          <Card
            label="RMSE"
            value={result.rmse ?? result.metrics?.rmse}
          />
          <Card
            label="R²"
            value={result.r2 ?? result.metrics?.r2}
          />
        </div>
      )}

      {/* 📈 PRICE CHART */}
      {result?.chart_data && (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="mb-4 font-semibold">Price Trend</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={result.chart_data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line dataKey="close" stroke="#6366f1" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 📉 VOLUME CHART */}
      {result?.chart_data && (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h3 className="mb-4 font-semibold">Volume</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={result.chart_data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line dataKey="volume" stroke="green" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 🕯️ CANDLESTICK (LIGHT VERSION) */}
      {result?.chart_data && (
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="mb-4 font-semibold">Candlestick View</h3>

          <div className="flex gap-1 overflow-x-auto">
            {result.chart_data.slice(-60).map((d, i) => {
              const isUp = d.close > d.open;

              return (
                <div key={i} className="flex flex-col items-center">
                  {/* wick */}
                  <div
                    style={{
                      height: `${(d.high - d.low) * 0.3}px`,
                      width: "2px",
                      background: isUp ? "green" : "red",
                    }}
                  />

                  {/* body */}
                  <div
                    style={{
                      height: `${Math.abs(d.open - d.close) * 2}px`,
                      width: "8px",
                      background: isUp ? "green" : "red",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Layout>
  );
}

/* 📦 CARD COMPONENT */
function Card({ label, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-xl font-bold">
        {typeof value === "number" ? `$${value}` : value}
      </p>
    </div>
  );
}

export default Dashboard;