import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignupPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FavoritesList from "./pages/FavoriteList.jsx";
import Detail from "./pages/Detail.jsx";
import ManagePost from "./pages/ManagePost.jsx";
import CreatePostForm from "./components/CreatePost.jsx";
import { UserContext } from "./utils/UserContext.jsx";
import UpdateProfile from "./components/UpdateProfile.jsx";

function App() {
  const [user] = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/dashboard" replace /> : <SignUpPage />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/update-profile"
        element={user ? <UpdateProfile /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/favorites"
        element={user ? <FavoritesList /> : <Navigate to="/login" replace />}
      />
      <Route path="/posts/:id" element={<Detail />} />
      <Route
        path="/managePost"
        element={user ? <ManagePost /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/create-post"
        element={user ? <CreatePostForm /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
