import App from 'App';
import { RouteProps } from 'react-router-dom';

export interface HIASRoute extends RouteProps {
  isPublic?: boolean;
}

const routes: HIASRoute[] = [
  {
    path: '/login',
    element: <App />,
  },
];
