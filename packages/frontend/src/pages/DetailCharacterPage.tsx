import { useParams, useNavigate } from "react-router-dom";
import { useCharacterDetails } from "@/hooks/useCharacters";
import { useAuthStore } from "@/stores/authStore";
import { useLogout } from "@/hooks/useAuth";
import { Container, Card, Button, LoadingSpinner } from "@/components/styled/Common";

export const DetailCharacterPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: character, isLoading, error } = useCharacterDetails(parseInt(id || "0"));
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  // Redirect if not product owner
  if (user?.role !== "product_owner") {
    navigate("/characters");
    return null;
  }

  if (isLoading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Card>
          <h2>Error loading character details</h2>
          <p>{error.message}</p>
          <Button className="back-button" onClick={() => navigate("/characters")}>
            Back to Characters
          </Button>
        </Card>
      </Container>
    );
  }

  if (!character) {
    return (
      <Container>
        <Card>
          <h2>Character not found</h2>
          <Button className="back-button" onClick={() => navigate("/characters")}>
            Back to Characters
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <div className="detail-character-header">
        <div>
          <h1>Character Details</h1>
          <p>Welcome, {user?.name} (Product Owner)</p>
        </div>
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
      </div>

      <Button className="back-button" onClick={() => navigate("/characters")}>
        ← Back to Characters
      </Button>

      <Card>
        <div className="character-image-container">
          <img className="character-image" src={character.image} alt={character.name} />
        </div>

        <h2 className="character-title">{character.name}</h2>

        <div className="character-info">
          <div className="info-section">
            <div className="info-label">Status</div>
            <div className="info-value">{character.status}</div>
          </div>

          <div className="info-section">
            <div className="info-label">Species</div>
            <div className="info-value">{character.species}</div>
          </div>

          <div className="info-section">
            <div className="info-label">Type</div>
            <div className="info-value">{character.type || "Unknown"}</div>
          </div>

          <div className="info-section">
            <div className="info-label">Gender</div>
            <div className="info-value">{character.gender}</div>
          </div>

          <div className="info-section">
            <div className="info-label">Origin</div>
            <div className="info-value">{character.origin.name}</div>
          </div>

          <div className="info-section">
            <div className="info-label">Location</div>
            <div className="info-value">{character.location.name}</div>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <div className="info-label">Episodes</div>
          <div className="episodes-grid">
            {character.episode.map((episode, index) => (
              <div key={index} className="episode-item">
                Episode {episode.split("/").pop()}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <div className="info-label">Created</div>
          <div className="info-value">{new Date(character.created).toLocaleDateString()}</div>
        </div>
      </Card>
    </Container>
  );
};
