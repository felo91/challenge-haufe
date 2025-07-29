import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCharacters, useAddFavorite, useRemoveFavorite } from "@/hooks/useCharacters";
import { useLogout } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";
import { CharacterBasicInformation } from "@rick-morty-app/libs";
import { Container, Card, Button, LoadingSpinner } from "@/components/styled/Common";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #f8f9fa;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f8f9fa;
  }
`;

const FavoriteButton = styled.button<{ $isFavorite: boolean }>`
  background: ${({ $isFavorite }) => ($isFavorite ? "#dc3545" : "#28a745")};
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DetailsButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: #0056b3;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  background: ${({ $active }) => ($active ? "#007bff" : "white")};
  color: ${({ $active }) => ($active ? "white" : "#333")};
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: ${({ $active }) => ($active ? "#0056b3" : "#f8f9fa")};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

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
      <Header>
        <div>
          <h1>Rick & Morty Characters</h1>
          <p>
            Welcome, {user?.name} ({user?.role})
          </p>
        </div>
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
      </Header>

      <Card>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Status</Th>
              <Th>Species</Th>
              <Th>Gender</Th>
              <Th>Favorite</Th>
              {user?.role === "product_owner" && <Th>Details</Th>}
            </tr>
          </thead>
          <tbody>
            {data?.results.map((character: CharacterBasicInformation) => (
              <Tr key={character.id}>
                <Td>{character.name}</Td>
                <Td>{character.status}</Td>
                <Td>{character.species}</Td>
                <Td>{character.gender}</Td>
                <Td>
                  <FavoriteButton
                    $isFavorite={character.isFavorite}
                    onClick={() => handleFavoriteToggle(character.id, character.isFavorite)}
                    disabled={addFavorite.isPending || removeFavorite.isPending}
                  >
                    {character.isFavorite ? "Remove" : "Add"}
                  </FavoriteButton>
                </Td>
                {user?.role === "product_owner" && (
                  <Td>
                    <DetailsButton onClick={() => handleViewDetails(character.id)}>👁️ View</DetailsButton>
                  </Td>
                )}
              </Tr>
            ))}
          </tbody>
        </Table>

        {data && (
          <Pagination>
            <PageButton onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </PageButton>
            <span>
              Page {page} of {data.info.pages}
            </span>
            <PageButton onClick={() => setPage(page + 1)} disabled={page === data.info.pages}>
              Next
            </PageButton>
          </Pagination>
        )}
      </Card>
    </Container>
  );
};
