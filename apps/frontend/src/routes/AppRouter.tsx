import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { routes } from './routeConfig';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          const Component = route.element;
          
          // Landing Page and Onboarding/Recommendations - No Layout
          if (route.path === '/' || route.path === '/onboarding' || route.path === '/recommendations') {
            return (
              <Route 
                key={route.path} 
                path={route.path} 
                element={<Component />} 
              />
            );
          }
          
          // Main App Routes with Layout
          return (
            <Route key={route.path} path={route.path} element={<MainLayout />}>
              <Route index element={<Component />} />
            </Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter; 