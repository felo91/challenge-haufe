import { useParams, useNavigate } from "react-router-dom";
import { useCharacterDetails } from "@/hooks/useCharacters";
import { useAuthStore } from "@/stores/authStore";
import { useLogout } from "@/hooks/useAuth";
import { Container, Card, Button, LoadingSpinner } from "@/components/styled/Common";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CharacterInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
`;

const InfoSection = styled.div`
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
`;

const InfoLabel = styled.div`
  font-weight: 600;
  color: #495057;
  margin-bottom: 8px;
`;

const InfoValue = styled.div`
  color: #212529;
  font-size: 16px;
`;

const ImageContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const CharacterImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
`;

const BackButton = styled(Button)`
  margin-bottom: 20px;
`;

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
          <BackButton onClick={() => navigate("/characters")}>Back to Characters</BackButton>
        </Card>
      </Container>
    );
  }

  if (!character) {
    return (
      <Container>
        <Card>
          <h2>Character not found</h2>
          <BackButton onClick={() => navigate("/characters")}>Back to Characters</BackButton>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <div>
          <h1>Character Details</h1>
          <p>Welcome, {user?.name} (Product Owner)</p>
        </div>
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
      </Header>

      <BackButton onClick={() => navigate("/characters")}>← Back to Characters</BackButton>

      <Card>
        <ImageContainer>
          <CharacterImage src={character.image} alt={character.name} />
        </ImageContainer>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>{character.name}</h2>

        <CharacterInfo>
          <InfoSection>
            <InfoLabel>Status</InfoLabel>
            <InfoValue>{character.status}</InfoValue>
          </InfoSection>

          <InfoSection>
            <InfoLabel>Species</InfoLabel>
            <InfoValue>{character.species}</InfoValue>
          </InfoSection>

          <InfoSection>
            <InfoLabel>Type</InfoLabel>
            <InfoValue>{character.type || "Unknown"}</InfoValue>
          </InfoSection>

          <InfoSection>
            <InfoLabel>Gender</InfoLabel>
            <InfoValue>{character.gender}</InfoValue>
          </InfoSection>

          <InfoSection>
            <InfoLabel>Origin</InfoLabel>
            <InfoValue>{character.origin.name}</InfoValue>
          </InfoSection>

          <InfoSection>
            <InfoLabel>Location</InfoLabel>
            <InfoValue>{character.location.name}</InfoValue>
          </InfoSection>
        </CharacterInfo>

        <div style={{ marginTop: "20px" }}>
          <InfoLabel>Episodes</InfoLabel>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {character.episode.map((episode, index) => (
              <div
                key={index}
                style={{
                  background: "#e9ecef",
                  padding: "8px",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                Episode {episode.split("/").pop()}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <InfoLabel>Created</InfoLabel>
          <InfoValue>{new Date(character.created).toLocaleDateString()}</InfoValue>
        </div>
      </Card>
    </Container>
  );
};
