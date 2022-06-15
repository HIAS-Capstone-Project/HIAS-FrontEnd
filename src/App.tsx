import React, { StrictMode, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Suspense fallback={<></>}>
      <StrictMode>
        <BrowserRouter></BrowserRouter>
      </StrictMode>
    </Suspense>
  );
}

export default App;

