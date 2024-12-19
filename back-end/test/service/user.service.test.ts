// tests/userService.test.ts
import userService from "../../service/user.service";
import { User } from "../../model/user";
import { mockDb } from "../utils/mockDb"; // Assuming you have a mockDb utility

// In-memory database mock setup (e.g., using sqlite3 or any mock)
beforeAll(async () => {
  await mockDb.connect(); // Connect to in-memory or mock DB
});

afterAll(async () => {
  await mockDb.disconnect(); // Clean up the DB connection after tests
});

describe("UserService", () => {
  it("should return all users, including newly added ones", async () => {
    // Arrange: Add users to the mock DB
    const user1 = await User.create({ name: "Alice", email: "alice@example.com" });
    const user2 = await User.create({ name: "Bob", email: "bob@example.com" });

    // Act: Call the service function to retrieve all users
    const users = await userService.getAllUsers();

    // Assert: Check if all users are returned
    expect(users.length).toBe(2); // Make sure the number of users is correct
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Alice", email: "alice@example.com" }),
        expect.objectContaining({ name: "Bob", email: "bob@example.com" }),
      ])
    );
  });

  it("should return an empty array if no users exist", async () => {
    // Act: Call the service function when no users are present
    const users = await getAllUsers();

    // Assert: Ensure the response is an empty array
    expect(users.length).toBe(0);
  });
});
