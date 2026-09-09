import { useEffect } from 'react';
import { API_BASE_URL } from './config';

export default function App() {
  useEffect(() => {
    document.title = 'Buildifo - Better systems. Stronger businesses.';
    window.__BUILDIFO_API_URL__ = API_BASE_URL;
  }, []);

  return <div className="original-app"><iframe title="Buildifo original experience" src="/orignal1.html" /></div>;
}
