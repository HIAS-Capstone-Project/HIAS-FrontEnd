import React from 'react';
import CountUp from 'react-countup';
import { Card } from 'antd';
import iconMap from 'utils/iconMap';
import './card.css';

const countUpProps = {
  start: 0,
  duration: 2.75,
  useEasing: true,
  useGrouping: true,
  separator: ',',
};

const NumberCard = ({ icon, color, title, number, countUp }: any) => {
  return (
    <Card className="numberCard" bordered={false} bodyStyle={{ padding: 10 }}>
      <span className="iconWarp" style={{ color }}>
        {iconMap[icon]}
      </span>
      <div className="content">
        <p className="title">{title || 'No Title'}</p>
        <p className="number">
          <CountUp
            start={0}
            end={number}
            duration={2.75}
            useEasing
            useGrouping
            separator=","
            {...(countUp || {})}
          />
        </p>
      </div>
    </Card>
  );
};

export default NumberCard;
