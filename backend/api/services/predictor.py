import yfinance as yf
import numpy as np
import os
from django.conf import settings
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, r2_score
from tensorflow.keras.models import load_model


class StockPredictor:
    def __init__(self, ticker, model_path=None, seq_len=100):
        self.ticker = ticker.upper()
        self.seq_len = seq_len
        self.model_path = model_path or settings.MODEL_PATH
        self.scaler = MinMaxScaler()
        self.model = None
        self.df = None

    # Fetch stock data
    def fetch_data(self):
        self.df = yf.download(self.ticker, period="1y", progress=False)

        if self.df.empty:
            raise ValueError(f"No data found for ticker {self.ticker}")

        return self.df

    # Preprocess for ML model
    def preprocess(self):
        prices = self.df[['Close']].values
        scaled = self.scaler.fit_transform(prices)

        X, y = [], []
        for i in range(self.seq_len, len(scaled)):
            X.append(scaled[i - self.seq_len:i])
            y.append(scaled[i])

        X = np.array(X).reshape(-1, self.seq_len, 1)
        y = np.array(y)

        return X, y

    # Load model
    def load_model(self):
        if not os.path.exists(self.model_path):
            raise FileNotFoundError(f"Model not found at {self.model_path}")

        self.model = load_model(self.model_path)
        model_seq_len = self.model.input_shape[1]
        if model_seq_len is not None:
            self.seq_len = int(model_seq_len)

    # Predict
    def predict(self, X):
        y_pred_scaled = self.model.predict(X, verbose=0)
        y_pred = self.scaler.inverse_transform(y_pred_scaled)
        return y_pred

    # Metrics
    def calculate_metrics(self, y_true, y_pred):
        y_true_inv = self.scaler.inverse_transform(y_true)
        mse = mean_squared_error(y_true_inv, y_pred)
        rmse = np.sqrt(mse)
        r2 = r2_score(y_true_inv, y_pred)

        return mse, rmse, r2

    # Next day prediction
    def predict_next_day(self, X):
        last_seq = X[-1].reshape(1, self.seq_len, 1)
        pred_scaled = self.model.predict(last_seq, verbose=0)
        pred_price = self.scaler.inverse_transform(pred_scaled)[0][0]

        return float(pred_price)

    # Prepare chart data for frontend
    def prepare_chart_data(self):
        df = self.df.copy()

        # Flatten multi-index columns (VERY IMPORTANT)
        if isinstance(df.columns, tuple) or hasattr(df.columns, "levels"):
            df.columns = df.columns.get_level_values(0)

        df_reset = df.reset_index()

        chart_data = []

        for _, row in df_reset.iterrows():
            chart_data.append({
                "date": str(row.iloc[0]),
                "open": float(row["Open"]),
                "high": float(row["High"]),
                "low": float(row["Low"]),
                "close": float(row["Close"]),
                "volume": float(row["Volume"]),
            })

        return chart_data

    # Main run
    def run(self):
        self.fetch_data()
        self.load_model()
        X, y = self.preprocess()

        y_pred = self.predict(X)
        mse, rmse, r2 = self.calculate_metrics(y, y_pred)
        next_day_price = self.predict_next_day(X)

        chart_data = self.prepare_chart_data()

        return {
            "ticker": self.ticker,
            "next_day_price": round(next_day_price, 2),
            "mse": round(mse, 3),
            "rmse": round(rmse, 3),
            "r2": round(r2, 3),
            "chart_data": chart_data[-200:],  # last 100 days (lighter)
        }
