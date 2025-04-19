import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Agency from "./components/Agency/Agency.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Client from "./components/Client/Client.jsx";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/agencies" element={<Agency />} />
          <Route path="/clients" element={<Client />} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
