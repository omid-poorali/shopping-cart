import "../styles/index.scss";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "./errorBoundary";
import { layouts } from "components";
import { FallBack } from "./fallback";
import NotFound from "pages/notFound";
import * as allRoutes from "routes";

export const Application = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={allRoutes.product.list} />} />
          {React.Children.toArray(
            allRoutes.all.map((route) => (
              <Route path={route.path}
                element={
                  <React.Suspense fallback={<FallBack />}>
                    <layouts.Desktop>
                      {React.createElement(route.element)}
                    </layouts.Desktop>
                  </React.Suspense>
                } />
            ))
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}