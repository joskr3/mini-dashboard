import { Route, Routes } from "react-router"
import HomePage from "./pages/home"
import TaskDetailPage from "./pages/task-detail"
import NewTaskPage from "./pages/new-task"
import { ThemeProvider } from "./context/theme-context"
import LoginPage from "./app/login/page"

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks/new" element={<NewTaskPage />} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App