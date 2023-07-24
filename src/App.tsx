import React from 'react';
import InfiniteScroll from './InfiniteScroll';
import { Layout } from './components/Layout.component';

export default function App() {
  const [scrollOffset, setScrollOffset] = React.useState(0);
  React.useEffect(() => {
    const layoutFooter = document.querySelector('#layout-footer');
    if (layoutFooter) {
      // @ts-ignore
      setScrollOffset(layoutFooter.offsetHeight);
    }
  }, []);

  return (
    <Layout>
      <h1>Infinite Scroll Example</h1>
      <InfiniteScroll scrollOffset={scrollOffset} earlyLoading={0.1} loadMaxItems={500} />
    </Layout>
  );
}
