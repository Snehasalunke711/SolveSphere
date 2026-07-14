import { Routes, Route } from "react-router";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import ExploreProblems from "./pages/ExploreProblems/ExploreProblems";
import ProblemDetails from "./pages/ProblemDetails/ProblemDetails";
import SubmitSolution from "./pages/SubmitSolution/SubmitSolution";
import AISuggestions from "./pages/AISuggestions/AISuggestions";
import Profile from "./pages/Profile/Profile";
import OwnerDashboard from "./pages/OwnerDashboard/OwnerDashboard";
import ViewSubmissions from "./pages/ViewSubmissions/ViewSubmissions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/explore" element={<ExploreProblems />} />
      <Route path="/problem/:id" element={<ProblemDetails />} />
      <Route path="/submit-solution/:id" element={<SubmitSolution />} />
      <Route path="/ai-suggestions" element={<AISuggestions />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/owner-dashboard" element={<OwnerDashboard />} />
      <Route path="/submissions/:id" element={<ViewSubmissions />} />
    </Routes>
  );
}

export default App;