import { Routes, Route, Navigate } from "react-router-dom";
import { AuthGuard } from "@/components/guards/AuthGuard";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { CharactersPage } from "@/pages/CharactersPage";
import { DetailCharacterPage } from "@/pages/DetailCharacterPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/characters"
        element={
          <AuthGuard>
            <CharactersPage />
          </AuthGuard>
        }
      />
      <Route
        path="/characters/:id"
        element={
          <AuthGuard>
            <DetailCharacterPage />
          </AuthGuard>
        }
      />
      <Route path="/" element={<Navigate to="/characters" replace />} />
    </Routes>
  );
}

export default App;
