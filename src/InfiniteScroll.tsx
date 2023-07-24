import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { throttle } from 'lodash';

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

type ReducerState = {
  start: number;
  data: Photo[];
};

type ReducerAction =
  | { type: 'CLEAR' }
  | { type: 'UPDATE'; data: ReducerState['data']; increasedBy: number };

const DefaultReducerState: ReducerState = {
  start: 0,
  data: [],
};

function Reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case 'UPDATE':
      return { data: [...state.data, ...action.data], start: state.start + action.increasedBy };

    case 'CLEAR':
      return DefaultReducerState;

    default:
      throw new Error('Method not implemented');
  }
}

export type InfiniteScrollProps = {
  scrollOffset?: number;
  earlyLoading?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
  loadMaxItems?: number;
};

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  scrollOffset,
  earlyLoading,
  loadMaxItems,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [shouldFetchData, setShouldFetchData] = React.useState(true); // load initial data
  const [photos, setPhotos] = React.useReducer(Reducer, DefaultReducerState);

  const fetchData = throttle(
    async function (increaseBy = 50) {
      try {
        if (loadMaxItems && loadMaxItems < photos.start + increaseBy) return;

        setLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/photos?_start=${photos.start}&_limit=${increaseBy}`
        ).then((response) => response.json());
        setPhotos({ type: 'UPDATE', data: response as Photo[], increasedBy: increaseBy });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setShouldFetchData(false);
      }
    },
    2 * 1000,
    { trailing: false }
  );

  const handleScroll = React.useCallback(() => {
    // @ts-expect-error
    const layoutFooterHeight = document.querySelector('#layout-footer')?.offsetHeight;
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    // scrollTop = wie weit habe von der oberen Kante meines Fensters nach unten gescrolllt
    // clientHeight = wie hoch ist mein fenster
    // scrollHeight = wie weit kann ich bis zur untersten Kante scrollen
    const currentScrollProgress = clientHeight + scrollTop;
    // console.log(scrollOffset);
    // FIXME: scrollOffset not working even with React.useCallback
    const scrollProgressWithOffset = scrollOffset
      ? currentScrollProgress + scrollOffset
      : currentScrollProgress;
    // console.log(currentScrollProgress, scrollProgressWithOffset);

    // if we want to trigger the loading earlier in order to provide an seamless transition
    const scrollProgressWithEarlyLoading = earlyLoading
      ? scrollProgressWithOffset * (1 + earlyLoading)
      : scrollProgressWithOffset;

    // console.log(scrollProgressWithOffset, scrollProgressWithEarlyLoading, earlyLoading);

    // console.log({
    //   scrollHeight,
    //   currentScrollProgress,
    //   scrollProgressWithEarlyLoading,
    // });
    // console.log(scrollHeight <= currentScrollProgress * 1.1);

    if (scrollHeight <= scrollProgressWithEarlyLoading) {
      setShouldFetchData(true);
    }
  }, [scrollOffset, earlyLoading]);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  React.useEffect(() => {
    if (shouldFetchData) {
      fetchData(50);
    }
  }, [shouldFetchData]);

  return (
    <div>
      <ul>
        {photos.data.map((item, index) => (
          <li key={index}>
            {item.id} + {item.title}
          </li>
        ))}
      </ul>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={35} />
        </Box>
      )}
    </div>
  );
};

export default InfiniteScroll;
