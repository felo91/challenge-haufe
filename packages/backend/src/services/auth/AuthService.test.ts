import { describe, it, expect, beforeEach, vi } from "vitest";
import { AuthService } from "./AuthService";
import { User } from "../../entities/User";
import { UserRole } from "@rick-morty-app/libs";
import * as jwt from "jsonwebtoken";

// Mock the database repository
const mockUserRepository = {
  findOne: vi.fn(),
  save: vi.fn(),
  create: vi.fn(),
};

vi.mock("../../config/database", () => ({
  AppDataSource: {
    getRepository: () => mockUserRepository,
  },
}));

describe("AuthService", () => {
  let authService: AuthService;
  let testUser: User;

  beforeEach(() => {
    authService = new AuthService();
    testUser = new User();
    testUser.id = "test-id";
    testUser.email = "test@example.com";
    testUser.name = "Test User";
    testUser.role = UserRole.FAN;
    testUser.setPassword("password123");

    vi.clearAllMocks();
  });

  it("should register a new user successfully", async (): Promise<void> => {
    const registerData = {
      email: "new@example.com",
      password: "password123",
      name: "New User",
      role: UserRole.FAN,
    };

    givenUserDoesNotExist(registerData.email);
    givenUserWillBeCreated(registerData);

    const result = await whenUserRegisters(registerData);

    thenUserIsRegistered(result);
    thenPasswordIsHashed();
  });

  it("should reject registration with existing email", async (): Promise<void> => {
    const registerData = {
      email: "existing@example.com",
      password: "password123",
      name: "Existing User",
      role: UserRole.FAN,
    };

    givenUserExists(registerData.email);

    await expect(whenUserRegisters(registerData)).rejects.toThrow(
      "User already exists"
    );
  });

  it("should login user with valid credentials", async (): Promise<void> => {
    const loginData = {
      email: "test@example.com",
      password: "password123",
    };

    givenUserExistsWithCredentials(loginData.email, "password123");

    const result = await whenUserLogsIn(loginData);

    thenLoginIsSuccessful(result);
    thenTokenIsValid(result.token);
  });

  it("should reject login with invalid password", async (): Promise<void> => {
    const loginData = {
      email: "test@example.com",
      password: "wrongpassword",
    };

    givenUserExistsWithCredentials(loginData.email, "password123");

    await expect(whenUserLogsIn(loginData)).rejects.toThrow(
      "Invalid credentials"
    );
  });

  it("should reject login with non-existent user", async (): Promise<void> => {
    const loginData = {
      email: "nonexistent@example.com",
      password: "password123",
    };

    givenUserDoesNotExist(loginData.email);

    await expect(whenUserLogsIn(loginData)).rejects.toThrow(
      "Invalid credentials"
    );
  });

  // Given functions
  function givenUserDoesNotExist(email: string): void {
    mockUserRepository.findOne.mockResolvedValue(null);
  }

  function givenUserExists(email: string): void {
    mockUserRepository.findOne.mockResolvedValue(testUser);
  }

  function givenUserWillBeCreated(data: any): void {
    const newUser = new User();
    newUser.email = data.email;
    newUser.name = data.name;
    newUser.role = data.role;
    newUser.setPassword(data.password);
    newUser.id = "new-id";

    mockUserRepository.create.mockReturnValue(newUser);
    mockUserRepository.save.mockResolvedValue(newUser);
  }

  function givenUserExistsWithCredentials(
    email: string,
    password: string
  ): void {
    const user = new User();
    user.id = "test-id";
    user.email = email;
    user.name = "Test User";
    user.role = UserRole.FAN;
    user.setPassword(password);

    mockUserRepository.findOne.mockResolvedValue(user);
  }

  // When functions
  async function whenUserRegisters(data: any): Promise<any> {
    return authService.register(data);
  }

  async function whenUserLogsIn(data: any): Promise<any> {
    return authService.login(data);
  }

  // Then functions
  function thenUserIsRegistered(result: any): void {
    expect(result.user).toBeDefined();
    expect(result.user.email).toBe("new@example.com");
    expect(result.user.name).toBe("New User");
    expect(result.user.role).toBe(UserRole.FAN);
    expect(result.token).toBeDefined();
  }

  function thenPasswordIsHashed(): void {
    expect(mockUserRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        password: expect.not.stringMatching("password123"),
      })
    );
  }

  function thenLoginIsSuccessful(result: any): void {
    expect(result.user).toBeDefined();
    expect(result.user.email).toBe("test@example.com");
    expect(result.token).toBeDefined();
  }

  function thenTokenIsValid(token: string): void {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default-secret"
    );
    expect(decoded).toBeDefined();
  }
});
