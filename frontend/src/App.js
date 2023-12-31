import { Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recepies from "./pages/Recipes";
import Settings from "./pages/Settings";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Footer from "./components/Footer";
import PostCreateForm from "./pages/auth/posts/PostCreateForm"
import './api/axiosDefaults'
import PostPage from "./pages/auth/posts/PostPage"
import PostEditForm from "./pages/auth/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <>
      <Navbar />
      <div className="container main">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/recipes" element={<Recepies message="No results found. Adjust the search keyword."  />} />
          <Route exact path="/liked" element={<Recepies message="No results found. Adjust the search Keyword or like a post." filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`} />} />
          <Route exact path="/bookmarked-posts" element={<Recepies message="No results found. Bookmark a post." filter={`bookmark__owner__profile=${profile_id}&ordering=-bookmark__created_at&`} />} />
          <Route exact path="/recipes/:id" element={<PostPage />} />
          <Route exact path="/recipes/:id/edit" element={<PostEditForm />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profiles/:id" element={<ProfilePage />} />
          <Route exact path="/post/create" element={<PostCreateForm />} />
          <Route exact path="/profiles/:id/edit/username" element={<UsernameForm />}/>
          <Route exact path="/profiles/:id/edit/password" element={<UserPasswordForm />}/>
          <Route exact path="/profiles/:id/edit" element={<ProfileEditForm />}/>
           {/* Fallback for unknown Routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
