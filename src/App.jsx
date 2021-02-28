import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";

import Layout from "./components/Layout";
import { AuthContext, AuthProvider } from "./context/authContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedPage from "./pages/ProtectedPage";

const AuthenticatedRoute = ({ children, ...rest }) => {
  const [cookies] = useCookies(["userInfo"]);

  return (
    <Route
      {...rest}
      render={() => (cookies.userInfo ? children : <Redirect to="/" />)}
    />
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <AuthenticatedRoute path="/protected">
              <ProtectedPage />
            </AuthenticatedRoute>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Layout>
      </AuthProvider>
      <Toaster />
    </Router>
  );
}

export default App;
