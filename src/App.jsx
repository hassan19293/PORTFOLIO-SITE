import { useEffect } from 'react';
import { API_BASE_URL } from './config';

export default function App() {
  useEffect(() => {
    document.title = 'Buildifo - Better systems. Stronger businesses.';
  }, []);

  const iframeSrc = API_BASE_URL
    ? `/orignal1.html?apiBaseUrl=${encodeURIComponent(API_BASE_URL)}`
    : '/orignal1.html';

  return <div className="original-app"><iframe title="Buildifo original experience" src={iframeSrc} /></div>;
}
