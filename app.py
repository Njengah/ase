# app.py
import streamlit as st
import yfinance as yf

# Set the title of the app
st.title("Stock Market Data App")

# Add a brief description
st.write(
    """
This app retrieves the latest stock market data for a given ticker symbol.
"""
)

# Add a sidebar for user input
st.sidebar.header("User Input")
ticker_symbol = st.sidebar.text_input(
    "Enter a stock ticker symbol (e.g., AAPL):", "AAPL"
)

# Fetch stock data using yfinance
if ticker_symbol:
    try:
        stock_data = yf.Ticker(ticker_symbol)
        st.write(f"### Stock Data for {ticker_symbol}")

        # Display basic stock information
        st.write("**Company Name:**", stock_data.info.get("longName", "N/A"))
        st.write("**Current Price:**", stock_data.info.get("currentPrice", "N/A"))
        st.write("**Market Cap:**", stock_data.info.get("marketCap", "N/A"))

        # Display historical data
        st.write("### Historical Data (Last 30 Days)")
        hist_data = stock_data.history(period="1mo")
        st.write(hist_data)

        # Plot the closing price
        st.write("### Closing Price Chart")
        st.line_chart(hist_data["Close"])

    except Exception as e:
        st.error(
            f"Error fetching data for {ticker_symbol}. Please check the ticker symbol and try again."
        )
        st.error(str(e))
else:
    st.warning("Please enter a stock ticker symbol to get started.")
