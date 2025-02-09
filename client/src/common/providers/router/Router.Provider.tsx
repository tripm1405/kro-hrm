import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RouterElement from '~common/providers/router/router-element';
import ManagerLayout from '~common/components/Manager.Layout';

const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route index element={<Navigate to="manager" replace />} />
          <Route path="manager" element={<ManagerLayout />}>
            <Route index element={<Navigate to="categories" replace />} />
            <Route path="categories">
              <Route path="" element={<RouterElement.CategoryListPage />} />
              <Route
                path="create"
                element={<RouterElement.CategoryCreatePage />}
              />
              <Route
                path=":id"
                element={<RouterElement.CategoryDetailPage />}
              />
            </Route>
            <Route path="translates">
              <Route path="" element={<RouterElement.TranslateListPage />} />
              <Route
                path="create"
                element={<RouterElement.TranslateCreatePage />}
              />
              <Route
                path=":id"
                element={<RouterElement.TranslateDetailPage />}
              />
            </Route>
            <Route path="*" element={<RouterElement.NotFound />} />
          </Route>
          <Route path="*" element={<RouterElement.NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RouterProvider;
