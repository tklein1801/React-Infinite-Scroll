import React from 'react';

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

type ReducerState = {
  start: number;
  end: number;
  data: Photo[];
};

type ReducerAction = {
  type: 'CLEAR';
};

function Reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case 'CLEAR':
      return { start: 0, end: 0, data: [] };

    default:
      throw new Error('Method not implemented');
  }
}

const InfiniteScroll = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [{}, setA] = React.useReducer(Reducer, {
    start: 0,
    end: 10,
    data: [],
  } as ReducerState);
  const [data, setData] = React.useState<Photo[]>([]);

  // Simulated data source for demonstration purposes
  const fetchMoreData = () => {
    // // Simulate API call or data fetch
    // const newData = [...data];
    // for (let i = 0; i < 100; i++) {
    //   newData.push(`Item ${data.length + i + 1}`);
    // }
    // setData(newData);
    // setIsLoading(false);
  };

  // Function to check if user has reached the bottom of the page
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollHeight - scrollTop === clientHeight) {
      setIsLoading(true);
    }
  };

  // Attach event listener when the component mounts
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fetch more data when isLoading changes
  React.useEffect(() => {
    if (isLoading) {
      fetchMoreData();
    }
  }, [isLoading]);

  React.useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScroll;
