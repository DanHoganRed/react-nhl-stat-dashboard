import React, { lazy, Suspense } from 'react';

const LazyGraph = lazy(() => import('./Graph'));

const Graph = props => (
  <Suspense fallback={null}>
    <LazyGraph {...props} />
  </Suspense>
);

export default Graph;
