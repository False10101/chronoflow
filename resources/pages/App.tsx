import ProtectedRoute from '@/lib/ProtectedRoute';
import LoginPage from './Login';
import {NotFoundPage} from './NotFoundPage';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './Dashboard';
import ExpenseTracker from './ExpenseTracker'; 
import CalendarPage from './CalendarPage';

function App() {
    return (
        <div className=" text-white min-h-screen w-full">
            <Routes>
                {/* --- Public Route --- */}
                <Route path="/login" element={<LoginPage />} />

                {/* --- Protected Routes --- */}
                {/* The root path is now protected and leads to the dashboard */}
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    } 
                />

                <Route
                    path='/expense-tracker'
                    element={
                        <ProtectedRoute>
                            <ExpenseTracker/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path='/events'
                    element={
                        <ProtectedRoute>
                            <CalendarPage/>
                        </ProtectedRoute>
                    }
                />

                {/* --- Catch-all for 404 --- */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;