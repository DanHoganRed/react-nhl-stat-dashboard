import React, { lazy, Suspense } from 'react';

const LazySiteNavbar = lazy(() => import('./SiteNavbar'));

const SiteNavbar = props => (
  <Suspense fallback={null}>
    <LazySiteNavbar {...props} />
  </Suspense>
);

export default SiteNavbar;
