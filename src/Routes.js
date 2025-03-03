import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import NotFoundPage from './pages/NotFoundPage'; // Import your 404 page component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/category/:category/:subcategory"
                    element={<CategoryPage />}
                />
                <Route path="" element={<NotFoundPage />} />{' '}
                {/ Catch-all route for 404 */}
            </Routes>
        </Router>
    );
};

export default App;
