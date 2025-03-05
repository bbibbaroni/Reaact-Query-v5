import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserList from "./components/UserList";
import Home from "./components/Home";
import NotFound from "./components/NotFound"; // NotFound 컴포넌트 추가

const queryClient = new QueryClient();

const UserListPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserList />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>
          홈
        </Link>
        <Link to="/user-list">이용자 목록</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-list" element={<UserListPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
