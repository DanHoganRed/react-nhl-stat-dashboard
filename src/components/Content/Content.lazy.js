import React, { lazy, Suspense } from 'react';

const LazyContent = lazy(() => import('./Content'));

const Content = props => (
  <Suspense fallback={null}>
    <LazyContent {...props} />
  </Suspense>
);

export default Content;
