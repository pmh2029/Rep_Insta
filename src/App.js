import 'emoji-mart/css/emoji-mart.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserContext } from './context/context';
import ProtectedRoute from './helpers/ProtectedRoute';
import useAuthListener from './hooks/useAuthListener';
import ChatBoard from './pages/ChatBoard';
import Dashboard from './pages/Dashboard';
import EditProfile from './pages/EditProfile';
import Explore from './pages/Explore';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Registration from './pages/Registration';

function App() {
    const { loggedInUser } = useAuthListener();

    return (
        <UserContext.Provider value={{ loggedInUser }}>
            <div className="bg-gray-bg">
                <Router>
                    <Switch>
                        <ProtectedRoute loggedInUser={loggedInUser} path="/" exact>
                            <Route component={Dashboard} />
                        </ProtectedRoute>
                        <Route path="/login" component={Login} />
                        <Route path="/registration" component={Registration} />
                        <Route path="/notfound" component={NotFound} />
                        <ProtectedRoute loggedInUser={loggedInUser} path="/edit">
                            <Route component={EditProfile} />
                        </ProtectedRoute>
                        <ProtectedRoute loggedInUser={loggedInUser} path="/chat">
                            <Route component={ChatBoard} />
                        </ProtectedRoute>
                        <ProtectedRoute loggedInUser={loggedInUser} path="/explore">
                            <Route component={Explore} />
                        </ProtectedRoute>
                        <ProtectedRoute loggedInUser={loggedInUser} path="/:username">
                            <Route component={Profile} />
                        </ProtectedRoute>
                    </Switch>
                </Router>
            </div>
        </UserContext.Provider>
    );
}

export default App;
