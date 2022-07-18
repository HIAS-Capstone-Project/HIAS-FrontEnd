import 'antd/dist/antd.min.css';
import MainLayout from 'layouts/main-layout';
import PrivateRoute from 'layouts/private-route';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from 'routers';
import { HIASRoute } from './routers/index';

function App() {
  const renderRouter = () =>
    routes.map((route: HIASRoute, idx) => {
      if (route.isPublic) {
        return <Route key={idx} {...route} />;
      }
      return (
        <Route
          key={idx}
          {...route}
          element={<PrivateRoute>{route.element}</PrivateRoute>}
        />
      );
    });
  return (
    <Suspense fallback={<></>}>
      <BrowserRouter>
        <MainLayout>
          <Routes>{renderRouter()}</Routes>
        </MainLayout>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
