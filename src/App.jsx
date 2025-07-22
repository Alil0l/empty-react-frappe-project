import { FrappeProvider } from 'frappe-react-sdk';
import { AppProvider } from './contexts/AppContext';
import { UserProvider } from './contexts/UserContext';
import { RouterProvider,createBrowserRouter, Navigate } from "react-router-dom";
import NavigationGuard from './NavigationGuard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


// Views
import Layout from './components/Layout/Layout';
import Home from './views/Home';
import Login from './views/Login';

export default function App() {
	const queryClient = new QueryClient()

  return (
	<div className="App">
	  <FrappeProvider>
			<AppProvider>
				<UserProvider>
						<QueryClientProvider client={queryClient}>
							<RouterProvider router={router} />
						</QueryClientProvider>
				</UserProvider>
			</AppProvider>
	  </FrappeProvider>
	</div>
  )
}

const routes = [{
	path: "/farha",
	element: <NavigationGuard><Layout /></NavigationGuard>,
	children: [
	{
		index: true,
		element: <Home />
	},
	{
		path: "login",
		element: <Login />
	},
]},
];

const router = createBrowserRouter(routes);

