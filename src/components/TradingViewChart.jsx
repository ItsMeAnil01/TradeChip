import React from 'react';
import TradingViewWidget from 'react-tradingview-widget';

const TradingViewChart = ({ symbol }) => {
  return (
    <div className="w-full h-full">
      <TradingViewWidget
        symbol={symbol || 'NASDAQ:IBM'}
        interval="D"
        timezone="Etc/UTC"
        theme="light"
        style="1"
        locale="en"
        toolbar_bg="#f1f3f6"
        enable_publishing={false}
        hide_side_toolbar={false}
        allow_symbol_change={true}
        autosize
      />
    </div>
  );
};

export default TradingViewChart;