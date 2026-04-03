import { useEffect, useState } from "react";
import API from "../api";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

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
      <h1 className="text-2xl font-bold mb-4">Prediction History </h1>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search by ticker (AAPL...)"
        className="p-3 border rounded-lg w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* HISTORY LIST */}
      {filteredHistory.length === 0 ? (
        <p>No matching results</p>
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
                  {new Date(item.created).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-green-600 font-semibold">
                  ${item.metrics.next_day_price}
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