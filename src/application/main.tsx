import "../styles/index.scss";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BasketProvider } from "./basket-context";
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from "./error-boundary";
import { LoadingFallBack } from "./loading-fallback";
import { Layout } from "components";
import NotFound from "pages/not-found";
import * as AppRoutes from "routes";

export const Application = () => {
  return (
    <ErrorBoundary>
      <BasketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={AppRoutes.Product.list} />} />
            {React.Children.toArray(
              AppRoutes.all.map((route) => (
                <Route path={route.path}
                  element={
                    <React.Suspense fallback={<LoadingFallBack />}>
                      <Layout.Main>
                        {React.createElement(route.element)}
                      </Layout.Main>
                    </React.Suspense>
                  } />
              ))
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BasketProvider>
      <ToastContainer />
    </ErrorBoundary>
  );
}