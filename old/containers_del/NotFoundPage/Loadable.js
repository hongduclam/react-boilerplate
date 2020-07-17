/**
 * Asynchronously loads the component for NotFoundPage
 */

import React from 'react';
import loadable from '_core/utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';

export default loadable(() => import('old/containers_del/NotFoundPage/index'), {
  fallback: <LoadingIndicator />,
});
