import { Route, Routes } from "react-router"
import HomePage from "./pages/home"
import TaskDetailPage from "./pages/task-detail"
import NewTaskPage from "./pages/new-task"
import { ThemeProvider } from "./context/theme-context"
import { AuthProvider } from "./context/auth-context"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="system">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks/new" element={<NewTaskPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App