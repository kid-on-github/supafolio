import './App.css'
import { Home } from './components/Home/Home'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { UserInfo, useSession } from './utils/useSession'
import { createContext, FunctionComponent, ReactNode } from 'react'
import { Welcome, welcomeLoader } from './components/Welcome/Welcome'

export const UserContext = createContext<UserInfo>({
	session: null,
	profile: null,
})

const Page = () => {
	const userInfo = useSession()
	console.log(userInfo)

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
				path: 'welcome',
				element: <Welcome />,
			},
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
