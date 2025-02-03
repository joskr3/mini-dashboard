import { Route, Routes } from "react-router"
import HomePage from "./pages/home"
import TaskDetailPage from "./pages/task-detail"
import NewTaskPage from "./pages/new-task"
import { ThemeProvider } from "./context/theme-context"

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks/new" element={<NewTaskPage />} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App