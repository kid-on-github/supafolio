import './App.css'
import { Home } from './components/Home/Home'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { UserInfo, useSession } from './utils/useSession'
import { createContext } from 'react'
import { Profile } from './components/Profile/Profile'

export const UserContext = createContext<UserInfo>({
	session: null,
	profile: null,
})

const UserInfoProvider = () => {
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
		element: <UserInfoProvider />,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: 'profile',
				element: <Profile />,
			},
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
