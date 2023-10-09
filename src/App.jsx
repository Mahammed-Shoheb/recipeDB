import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeLayout from './pages/HomeLayout';
import Landing from './pages/Landing';
import SingleRecipePage from './pages/SingleRecipePage';
import Error from './pages/Error';
import SinglePageError from './pages/SinglePageError';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { loader as landingPageLoader } from './pages/Landing';
import { loader as singlePageLoader } from './pages/SingleRecipePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingPageLoader(queryClient),
      },
      {
        path: 'recipe/:id',
        element: <SingleRecipePage />,
        errorElement: <SinglePageError />,
        loader: singlePageLoader(queryClient),
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
export default App;
