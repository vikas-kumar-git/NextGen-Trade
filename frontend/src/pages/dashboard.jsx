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
import { useTheme } from "../theme";

function Dashboard() {
  const [ticker, setTicker] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const location = useLocation();
  const { isDark } = useTheme();

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
      <div
        className={`mb-6 rounded-[1.75rem] border p-6 shadow-xl backdrop-blur ${
          isDark
            ? "border-white/10 bg-white/5 shadow-slate-950/20"
            : "border-white/70 bg-white/80 shadow-cyan-100/50"
        }`}
      >
        <h1 className={`mb-2 text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
          Stock Prediction Dashboard
        </h1>
        <p className={`mb-4 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
          Search by company name or ticker to fetch recent market data, run the trained LSTM model, and review the predicted next closing price with supporting charts.
        </p>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex-1 w-full">
            <input
              placeholder="Search company or ticker, for example Reliance, TCS, Apple, INFY.NS"
              className={`w-full rounded-2xl border p-3 focus:border-cyan-400 focus:outline-none ${
                isDark
                  ? "border-white/10 bg-slate-900/80 text-white placeholder:text-slate-500"
                  : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
              }`}
              value={ticker}
              onChange={(e) => {
                setTicker(e.target.value);
                setError("");
              }}
            />
            {suggestions.length > 0 && (
              <div
                className={`mt-2 overflow-hidden rounded-2xl border shadow-sm ${
                  isDark
                    ? "border-white/10 bg-slate-950/95"
                    : "border-slate-200 bg-white"
                }`}
              >
                {suggestions.map((company) => (
                  <button
                    key={company.ticker}
                    type="button"
                    onClick={() => handleSuggestionSelect(company)}
                    className={`w-full border-b px-4 py-3 text-left transition last:border-b-0 ${
                      isDark
                        ? "border-white/5 hover:bg-white/5"
                        : "border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`font-medium ${isDark ? "text-white" : "text-slate-900"}`}>
                      {company.name}
                    </div>
                    <div className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {company.ticker} • {company.exchange}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => fetchData(selectedCompany?.ticker || ticker)}
            className={`w-full rounded-2xl px-6 py-3 font-semibold transition md:w-auto ${
              isDark
                ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
                : "bg-emerald-500 text-white hover:bg-emerald-600"
            }`}
          >
            Generate Prediction
          </button>
        </div>
        <p className={`mt-3 text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          Indian examples: <span className="font-semibold">RELIANCE.NS</span>, <span className="font-semibold">TCS.NS</span>, <span className="font-semibold">INFY.NS</span>. US examples: <span className="font-semibold">AAPL</span>, <span className="font-semibold">MSFT</span>, <span className="font-semibold">TSLA</span>.
        </p>
      </div>

      <div
        className={`mb-6 rounded-[1.5rem] border p-4 shadow-xl backdrop-blur ${
          isDark
            ? "border-white/10 bg-white/5 shadow-slate-950/20"
            : "border-white/70 bg-white/80 shadow-cyan-100/50"
        }`}
      >
        <h2 className={`mb-2 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
          Selected Company
        </h2>
        {selectedCompany ? (
          <div className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
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
          <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            No company selected yet. Search for a company name or enter a ticker manually.
          </p>
        )}
      </div>

      {error && (
        <div
          className={`mb-6 rounded-[1.5rem] border p-4 text-sm ${
            isDark
              ? "border-red-400/30 bg-red-500/10 text-red-100"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
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
        <div
          className={`mb-6 rounded-[1.5rem] border p-4 shadow-xl backdrop-blur ${
            isDark
              ? "border-white/10 bg-white/5 shadow-slate-950/20"
              : "border-white/70 bg-white/80 shadow-cyan-100/50"
          }`}
        >
          <h2 className={`mb-1 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
            Closing Price Trend
          </h2>
          <p className={`mb-4 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
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
        <div
          className={`mb-6 rounded-[1.5rem] border p-4 shadow-xl backdrop-blur ${
            isDark
              ? "border-white/10 bg-white/5 shadow-slate-950/20"
              : "border-white/70 bg-white/80 shadow-cyan-100/50"
          }`}
        >
          <h3 className={`mb-1 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
            Trading Volume
          </h3>
          <p className={`mb-4 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
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
        <div
          className={`rounded-[1.5rem] border p-4 shadow-xl backdrop-blur ${
            isDark
              ? "border-white/10 bg-white/5 shadow-slate-950/20"
              : "border-white/70 bg-white/80 shadow-cyan-100/50"
          }`}
        >
          <h3 className={`mb-1 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
            Simple Candlestick Snapshot
          </h3>
          <p className={`mb-4 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
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
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-[1.5rem] border p-4 shadow-xl backdrop-blur ${
        isDark
          ? "border-white/10 bg-white/5 shadow-slate-950/20"
          : "border-white/70 bg-white/80 shadow-cyan-100/50"
      }`}
    >
      <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>{label}</p>
      <p className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
        {isCurrency ? formatCurrencyValue(value, ticker) : value}
      </p>
      <p className={`mt-2 text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
        {description}
      </p>
    </div>
  );
}

export default Dashboard;
