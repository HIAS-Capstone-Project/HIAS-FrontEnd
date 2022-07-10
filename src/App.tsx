import 'antd/dist/antd.min.css';
import MainLayout from 'layouts/main-layout';
import PrivateRoute from 'layouts/private-route';
import { StrictMode, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from 'routers';
import { HIASRoute } from './routers/index';

function App() {
  const renderRouter = () =>
    routes
      // .filter((route: HIASRoute) => {
      //   if (1 === 1) {
      //     return route.path === '/error';
      //   }
      //   return true;
      // })
      .map((route: HIASRoute, idx) => {
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
      <StrictMode>
        <BrowserRouter>
          <MainLayout>
            <Routes>{renderRouter()}</Routes>
          </MainLayout>
          {/* <LoginPage /> */}
        </BrowserRouter>
      </StrictMode>
    </Suspense>
  );
}

export default App;
