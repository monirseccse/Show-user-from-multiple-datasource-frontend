import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./user/user-list";
import UserForm from "./user/user-form";
import Home from "./home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/create" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm />} />
        <Route path="/users/view/:id" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
