import * as React from 'react';
import { TimeAgo as ReactTimeAgo } from 'react-time-ago';

const TimeAgo = ({ unixTime }: { unixTime: number}) => {
  // convert seconds to milliseconds.
  const time = new Date(unixTime * 1000);
  return <ReactTimeAgo>{time}</ReactTimeAgo>;
};

export default TimeAgo;
