import React from 'react';
import './App.css';
import { throttle } from 'lodash';
import InfiniteScroll from './InfiniteScroll';

function App() {
  return (
    <div>
      <InfiniteScroll />
    </div>
  );
}

export default App;
