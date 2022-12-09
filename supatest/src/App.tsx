import './App.css'
import { Home } from './components/Home/Home'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { AuthPage } from './components/AuthPage/AuthPage'
import { UserInfo, useSession } from './utils/useSession'
import { createContext, FunctionComponent, ReactNode } from 'react'
import { Welcome, welcomeLoader } from './components/Welcome/Welcome'
import { Events } from './components/Events/Events'

export const UserContext = createContext<UserInfo>({
	session: null,
	profile: null,
})

const Page = () => {
	const userInfo = useSession()

	return (
		<UserContext.Provider value={userInfo}>
			<Outlet />
		</UserContext.Provider>
	)
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <Page />,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: 'auth',
				element: <AuthPage />,
			},
			{
				path: 'welcome',
				element: <Welcome />,
				loader: welcomeLoader,
			},
			{
				path: 'events',
				element: <Events />,
			},
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
