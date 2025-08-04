import { Routes, Route, useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // In a real app, you would get this token from your Laravel API
        const fakeToken = 'your-secret-api-token';
        localStorage.setItem('api_token', fakeToken);
        
        // Redirect to the root path after login, which is now the dashboard
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-3xl font-bold">Login Page</h1>
            <p>Clicking "Login" will simulate getting a token and storing it.</p>
            <button
                type="button"
                onClick={handleLogin}
                className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded-md hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            >
                Login
            </button>
        </div>
    );
};

export default LoginPage;