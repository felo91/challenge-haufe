import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCharacters, useAddFavorite, useRemoveFavorite } from "@/hooks/useCharacters";
import { useLogout } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";
import { CharacterBasicInformation } from "@rick-morty-app/libs";
import { Container, Card, Button, LoadingSpinner } from "@/components/styled/Common";

export const CharactersPage = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading, error } = useCharacters(page);
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const logout = useLogout();
  const user = useAuthStore((state) => state.user);

  const handleFavoriteToggle = (characterId: number, isFavorite: boolean) => {
    if (isFavorite) {
      removeFavorite.mutate({ characterId });
    } else {
      addFavorite.mutate({ characterId });
    }
  };

  const handleViewDetails = (characterId: number) => {
    navigate(`/characters/${characterId}`);
  };

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
          <h2>Error loading characters</h2>
          <p>{error.message}</p>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <div className="characters-header">
        <div>
          <h1>Rick & Morty Characters</h1>
          <p>
            Welcome, {user?.name} ({user?.role})
          </p>
        </div>
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
      </div>

      <Card>
        <table className="characters-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Species</th>
              <th>Gender</th>
              <th>Favorite</th>
              {user?.role === "product_owner" && <th>Details</th>}
            </tr>
          </thead>
          <tbody>
            {data?.results.map((character: CharacterBasicInformation) => (
              <tr key={character.id}>
                <td>{character.name}</td>
                <td>{character.status}</td>
                <td>{character.species}</td>
                <td>{character.gender}</td>
                <td>
                  <button
                    className={`favorite-button ${character.isFavorite ? "is-favorite" : ""}`}
                    onClick={() => handleFavoriteToggle(character.id, character.isFavorite)}
                    disabled={addFavorite.isPending || removeFavorite.isPending}
                  >
                    {character.isFavorite ? "Remove" : "Add"}
                  </button>
                </td>
                {user?.role === "product_owner" && (
                  <td>
                    <button className="details-button" onClick={() => handleViewDetails(character.id)}>
                      👁️ View
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {data && (
          <div className="pagination">
            <button className="page-button" onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </button>
            <span>
              Page {page} of {data.info.pages}
            </span>
            <button className="page-button" onClick={() => setPage(page + 1)} disabled={page === data.info.pages}>
              Next
            </button>
          </div>
        )}
      </Card>
    </Container>
  );
};
