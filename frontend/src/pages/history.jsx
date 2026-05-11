import { useEffect, useState } from "react";
import API from "../api";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { formatCurrencyValue } from "../utils/currency";
import { useTheme } from "../theme";

function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { isDark } = useTheme();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await API.get("predictions/");
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Filter history by ticker
  const filteredHistory = history.filter((item) =>
    item.ticker.toLowerCase().includes(search.toLowerCase())
  );

  //delete history item
  const deleteHistoryItem = async (id) => {
    try {
      await API.delete(`predictions/${id}/`);
      setHistory((currentHistory) =>
        currentHistory.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = (ticker) => {
    navigate("/dashboard", { state: { ticker } });
  };

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
          Prediction History
        </h1>
        <p className={isDark ? "text-slate-300" : "text-slate-600"}>
          Review your saved predictions, search by ticker, and click any record to load that stock back into the dashboard.
        </p>
      </div>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search by ticker, for example AAPL or TCS.NS"
        className={`mb-6 w-full rounded-2xl border p-3 focus:border-cyan-400 focus:outline-none ${
          isDark
            ? "border-white/10 bg-slate-900/80 text-white placeholder:text-slate-500"
            : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
        }`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* HISTORY LIST */}
      {filteredHistory.length === 0 ? (
        <div
          className={`rounded-[1.5rem] border p-6 shadow-xl backdrop-blur ${
            isDark
              ? "border-white/10 bg-white/5 text-slate-300 shadow-slate-950/20"
              : "border-white/70 bg-white/80 text-slate-600 shadow-cyan-100/50"
          }`}
        >
          No matching results found. Try a different ticker or create a new prediction from the dashboard.
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.ticker)}
              className={`flex cursor-pointer justify-between rounded-[1.5rem] border p-4 shadow-xl transition backdrop-blur ${
                isDark
                  ? "border-white/10 bg-white/5 shadow-slate-950/20 hover:bg-white/10"
                  : "border-white/70 bg-white/80 shadow-cyan-100/50 hover:bg-white"
              }`}
            >
              <div>
                <p className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{item.ticker}</p>
                <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Created on {new Date(item.created).toLocaleString()}
                </p>
                <p className={`mt-1 text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Click to reopen this ticker in the dashboard.
                </p>
              </div>

              <div className="text-right">
                <p className={`font-semibold ${isDark ? "text-emerald-300" : "text-emerald-700"}`}>
                  Predicted close: {formatCurrencyValue(item.metrics.next_day_price, item.ticker)}
                </p>
                <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  RMSE: {item.metrics.rmse}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteHistoryItem(item.id);
                  }}
                  className={`mt-2 rounded-full px-3 py-1 text-xs font-medium transition ${
                    isDark
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default History;
