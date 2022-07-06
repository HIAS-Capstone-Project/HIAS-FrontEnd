import MainLayout from 'layouts/main-layout';
import LoginPage from 'pages/login';
import React, { StrictMode, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Suspense fallback={<></>}>
      <StrictMode>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </StrictMode>
    </Suspense>
  );
}

export default App;
