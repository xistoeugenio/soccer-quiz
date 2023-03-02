import { useState } from 'react';

function useLoading() {
  const [loading, setLoading] = useState(false);

  function startLoading() {
    setLoading(true);
  }

  function stopLoading() {
    setLoading(false);
  }

  return [loading, startLoading, stopLoading];
}

export default useLoading;