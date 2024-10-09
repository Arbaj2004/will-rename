import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../pages/Login'
import ResetPassword from '../pages/ResetPassword'
import ForgotPassword from '../pages/ForgotPassword'
import LandingPage from '../pages/LandingPage'
import ProfilePage from '../pages/ProfilePage'
import YouTubePlaylist from '../pages/YouTubePlaylist'
import AdminPage from '../pages/AdminPage'
import RegisterPage from '../components/RegisterPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <LandingPage />
            },
            {
                path: '/admin',
                element: <AdminPage/>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/reset-password/:resetToken',
                element: <ResetPassword />
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword />
            },
            {
                path: '/register-users',
                element: <RegisterPage/>
            },
            {
                path: '/profile',
                element: <ProfilePage/>
            },
            {
                path: '/youtube',
                element: <YouTubePlaylist/>
            },
        ]
    }
])

export default router