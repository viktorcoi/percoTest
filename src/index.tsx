import ReactDOM from 'react-dom/client';
import './assets/styles/main.scss';
import './assets/styles/reset.scss';
import './assets/styles/variables.scss';
import App from './pages/App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <App/>
);