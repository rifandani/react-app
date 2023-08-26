import ReactDOM from 'react-dom/client';
import App from './app/App';
import './main.css';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

// ONLY include browser worker on 'development' env
if (import.meta.env.DEV) {
  void import('./mocks/browser.mock')
    .then(({ worker }) => {
      // insert it into global window object, so we can debug the worker in runtime (e.g Chrome DevTools)
      window.msw = { worker };
      // start browser worker
      return worker.start({ onUnhandledRequest: 'bypass' });
    })
    .then(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ReactDOM.createRoot(root!).render(<App />);
    });
} else {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ReactDOM.createRoot(root!).render(<App />);
}
