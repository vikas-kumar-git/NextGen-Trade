import { useState, useEffect } from "react";
import API from "../api";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import companyList from "../data/companyList";
import { formatCurrencyValue } from "../utils/currency";
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
  const [error, setError] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const location = useLocation();

  const searchTerm = ticker.trim().toLowerCase();
  const suggestions = searchTerm
    ? companyList
        .filter(
          (company) =>
            company.name.toLowerCase().includes(searchTerm) ||
            company.ticker.toLowerCase().includes(searchTerm)
        )
        .slice(0, 6)
    : [];

  // 🔹 Fetch data function
  const fetchData = async (symbol) => {
    const cleanedSymbol = symbol.trim().toUpperCase();
    if (!cleanedSymbol) {
      setError("Enter a stock ticker like AAPL, TSLA, INFY.NS, or RELIANCE.NS.");
      return;
    }

    setError("");
    try {
      const res = await API.post("predict/", { ticker: cleanedSymbol });
      setResult(res.data);
      if (!selectedCompany || selectedCompany.ticker !== cleanedSymbol) {
        const matchedCompany = companyList.find(
          (company) => company.ticker === cleanedSymbol
        );
        setSelectedCompany(
          matchedCompany || {
            name: cleanedSymbol,
            ticker: cleanedSymbol,
            exchange: "Custom ticker",
          }
        );
      }
    } catch (err) {
      console.error(err);
      setResult(null);
      setError(
        err?.response?.data?.error ||
          "Data not available for this company or ticker. Try another company name or use a Yahoo Finance symbol like RELIANCE.NS, TCS.NS, or AAPL."
      );
    }
  };

  const handleSuggestionSelect = (company) => {
    setTicker(company.name);
    setSelectedCompany(company);
    setError("");
  };

  // 🔹 Auto-load when coming from history page
  useEffect(() => {
    if (location.state?.ticker) {
      setTicker(location.state.ticker);
      const matchedCompany = companyList.find(
        (company) => company.ticker === location.state.ticker
      );
      setSelectedCompany(
        matchedCompany || {
          name: location.state.ticker,
          ticker: location.state.ticker,
          exchange: "Saved ticker",
        }
      );
      fetchData(location.state.ticker);
    }
    // This only needs to react to navigation state changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  return (
    <Layout>
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Stock Prediction Dashboard
        </h1>
        <p className="text-gray-600 mb-4">
          Search by company name or ticker to fetch recent market data, run the trained LSTM model, and review the predicted next closing price with supporting charts.
        </p>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex-1 w-full">
            <input
              placeholder="Search company or ticker, for example Reliance, TCS, Apple, INFY.NS"
              className="p-3 border rounded-lg w-full"
              value={ticker}
              onChange={(e) => {
                setTicker(e.target.value);
                setError("");
              }}
            />
            {suggestions.length > 0 && (
              <div className="mt-2 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                {suggestions.map((company) => (
                  <button
                    key={company.ticker}
                    type="button"
                    onClick={() => handleSuggestionSelect(company)}
                    className="w-full border-b last:border-b-0 border-gray-100 px-4 py-3 text-left hover:bg-gray-50"
                  >
                    <div className="font-medium text-gray-900">{company.name}</div>
                    <div className="text-sm text-gray-500">
                      {company.ticker} • {company.exchange}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => fetchData(selectedCompany?.ticker || ticker)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg w-full md:w-auto"
          >
            Generate Prediction
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Indian examples: <span className="font-semibold">RELIANCE.NS</span>, <span className="font-semibold">TCS.NS</span>, <span className="font-semibold">INFY.NS</span>. US examples: <span className="font-semibold">AAPL</span>, <span className="font-semibold">MSFT</span>, <span className="font-semibold">TSLA</span>.
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="font-semibold text-gray-900 mb-2">Selected Company</h2>
        {selectedCompany ? (
          <div className="text-sm text-gray-700">
            <p>
              <span className="font-semibold">Company:</span> {selectedCompany.name}
            </p>
            <p>
              <span className="font-semibold">Ticker used:</span> {selectedCompany.ticker}
            </p>
            <p>
              <span className="font-semibold">Exchange:</span> {selectedCompany.exchange}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No company selected yet. Search for a company name or enter a ticker manually.
          </p>
        )}
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* 📊 TOP CARDS */}
      {result && (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <Card
            label="Predicted Next Close"
            value={result.next_day_price ?? result.metrics?.next_day_price}
            description="Model estimate for the next closing price."
            ticker={result.ticker || selectedCompany?.ticker}
            isCurrency
          />
          <Card
            label="Mean Squared Error"
            value={result.mse ?? result.metrics?.mse}
            description="Lower values generally indicate better fit."
          />
          <Card
            label="Root Mean Squared Error"
            value={result.rmse ?? result.metrics?.rmse}
            description="Average prediction error in price units."
          />
          <Card
            label="R-squared"
            value={result.r2 ?? result.metrics?.r2}
            description="Closer to 1 usually means stronger fit."
          />
        </div>
      )}

      {/* 📈 PRICE CHART */}
      {result?.chart_data && (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="mb-1 font-semibold">Closing Price Trend</h2>
          <p className="text-sm text-gray-500 mb-4">
            Recent price movement returned by the backend for the selected ticker.
          </p>

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
          <h3 className="mb-1 font-semibold">Trading Volume</h3>
          <p className="text-sm text-gray-500 mb-4">
            Daily traded volume over the same returned market window.
          </p>

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
          <h3 className="mb-1 font-semibold">Simple Candlestick Snapshot</h3>
          <p className="text-sm text-gray-500 mb-4">
            Green bars indicate the close was above the open. Red bars indicate the close was below the open.
          </p>

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
function Card({ label, value, description, ticker, isCurrency = false }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-xl font-bold">
        {isCurrency ? formatCurrencyValue(value, ticker) : value}
      </p>
      <p className="text-xs text-gray-500 mt-2">{description}</p>
    </div>
  );
}

export default Dashboard;
