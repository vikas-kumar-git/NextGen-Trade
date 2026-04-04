import { useEffect, useState } from "react";
import API from "../api";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { formatCurrencyValue } from "../utils/currency";

function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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

  const handleClick = (ticker) => {
    navigate("/dashboard", { state: { ticker } });
  };

  return (
    <Layout>
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h1 className="text-2xl font-bold mb-2">Prediction History</h1>
        <p className="text-gray-600">
          Review your saved predictions, search by ticker, and click any record to load that stock back into the dashboard.
        </p>
      </div>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search by ticker, for example AAPL or TCS.NS"
        className="p-3 border rounded-lg w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* HISTORY LIST */}
      {filteredHistory.length === 0 ? (
        <div className="rounded-xl bg-white p-6 text-gray-600 shadow">
          No matching results found. Try a different ticker or create a new prediction from the dashboard.
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.ticker)}
              className="bg-white p-4 rounded-xl shadow flex justify-between cursor-pointer hover:bg-gray-100 transition"
            >
              <div>
                <p className="font-bold">{item.ticker}</p>
                <p className="text-sm text-gray-500">
                  Created on {new Date(item.created).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Click to reopen this ticker in the dashboard.
                </p>
              </div>

              <div className="text-right">
                <p className="text-green-600 font-semibold">
                  Predicted close: {formatCurrencyValue(item.metrics.next_day_price, item.ticker)}
                </p>
                <p className="text-sm text-gray-500">
                  RMSE: {item.metrics.rmse}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default History;
