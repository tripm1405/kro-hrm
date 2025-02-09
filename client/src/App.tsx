import './App.css';
import RouterProvider from '~common/providers/router/Router.Provider';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TranslateProvider from '~common/providers/translate/Translate.Provider';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '~common/redux/store';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <TranslateProvider>
          <RouterProvider />
        </TranslateProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
}

export default App;
