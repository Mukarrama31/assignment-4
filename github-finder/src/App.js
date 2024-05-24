import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; 
import Search from './components/Search';
import User from './components/User';
import './styles/Search.css';
import './styles/User.css';
import './App.css';

const App = () => {
    return (
        <Router>
            <AnimatePresence exitBeforeEnter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Search />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/user/:username"
                        element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <User />
                            </motion.div>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </Router>
    );
};

export default App;
