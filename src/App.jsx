import { FrappeProvider } from 'frappe-react-sdk';
import { AppProvider } from './contexts/AppContext';
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { RouterProvider,createBrowserRouter, Navigate } from "react-router-dom";
import NavigationGuard from './NavigationGuard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

// Views
import Layout from './components/Layout/Layout';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import SpinWheelView from './views/SpinWheel';
import Dashboard from './views/Dashboard';
import About from './views/About';
import Contact from './views/Contact';
import Terms from './views/Terms';
import NotFound from './views/NotFound';

export default function App() {
	const queryClient = new QueryClient()

  return (
	<div className="App">
	  <ErrorBoundary>
		  <ThemeProvider>
			  <FrappeProvider
			  enableSocket={false}
			  >
					<AppProvider>
						<UserProvider>
								<QueryClientProvider client={queryClient}>
									<RouterProvider router={router} />
								</QueryClientProvider>
						</UserProvider>
					</AppProvider>
			  </FrappeProvider>
		  </ThemeProvider>
	  </ErrorBoundary>
	</div>
  )
}

const routes = [
	{
		path: "/portal",
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
			{
				path: "signup",
				element: <Signup />
			},
			{
				path: "spin-wheel",
				element: <SpinWheelView />
			},
			{
				path: "dashboard",
				element: <Dashboard />
			},
			{
				path: "about",
				element: <About />
			},
			{
				path: "contact",
				element: <Contact />
			},
			{
				path: "terms",
				element: <Terms />
			},
		]
	},
	{
		path: "*",
		element: <NotFound />
	}
];

const router = createBrowserRouter(routes);

