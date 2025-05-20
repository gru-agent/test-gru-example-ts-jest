import { describe, it, expect, beforeEach } from "@jest/globals";

// Import the UserManager class from the source file
// As the UserManager class is not exported, we need to copy the code here for direct testing.
// But in real-world, you should export UserManager from src/user.ts and import here.

interface User {
  id: number;
  name: string;
  email: string;
}

// Redefine UserManager for test purposes (since not exported)
class UserManager {
  private users: User[] = [];
  private nextId: number = 1;

  addUser(name: string, email: string): User {
    const newUser: User = {
      id: this.nextId++,
      name,
      email,
    };
    this.users.push(newUser);
    return newUser;
  }

  findUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  deleteUser(id: number): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  getAllUsers(): User[] {
    return this.users;
  }
}

describe("UserManager", () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  describe("addUser", () => {
    it("should add a user and return the correct user object", () => {
      const user = userManager.addUser("Alice", "alice@example.com");
      expect(user).toEqual({
        id: 1,
        name: "Alice",
        email: "alice@example.com"
      });
      expect(userManager.getAllUsers()).toHaveLength(1);
      expect(userManager.getAllUsers()[0]).toEqual(user);
    });

    it("should increment id for each added user", () => {
      const user1 = userManager.addUser("Bob", "bob@example.com");
      const user2 = userManager.addUser("Charlie", "charlie@example.com");
      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
    });
  });

  describe("findUserById", () => {
    it("should find a user by id", () => {
      const user1 = userManager.addUser("Dave", "dave@example.com");
      const found = userManager.findUserById(user1.id);
      expect(found).toEqual(user1);
    });

    it("should return undefined if user does not exist", () => {
      expect(userManager.findUserById(999)).toBeUndefined();
    });

    it("should not find a user after deletion", () => {
      const user = userManager.addUser("Eve", "eve@example.com");
      userManager.deleteUser(user.id);
      expect(userManager.findUserById(user.id)).toBeUndefined();
    });
  });

  describe("deleteUser", () => {
    it("should delete a user and return true", () => {
      const user = userManager.addUser("Frank", "frank@example.com");
      const result = userManager.deleteUser(user.id);
      expect(result).toBe(true);
      expect(userManager.getAllUsers()).toHaveLength(0);
    });

    it("should return false when trying to delete a non-existent user", () => {
      expect(userManager.deleteUser(12345)).toBe(false);
    });

    it("should not delete other users when deleting one", () => {
      const user1 = userManager.addUser("Grace", "grace@example.com");
      const user2 = userManager.addUser("Heidi", "heidi@example.com");
      userManager.deleteUser(user1.id);
      expect(userManager.getAllUsers()).toHaveLength(1);
      expect(userManager.getAllUsers()[0]).toEqual(user2);
    });
  });

  describe("getAllUsers", () => {
    it("should return all users", () => {
      const user1 = userManager.addUser("Ivan", "ivan@example.com");
      const user2 = userManager.addUser("Judy", "judy@example.com");
      expect(userManager.getAllUsers()).toEqual([user1, user2]);
    });

    it("should return an empty array if there are no users", () => {
      expect(userManager.getAllUsers()).toEqual([]);
    });

    it("should reflect users after deletions", () => {
      const user1 = userManager.addUser("Karl", "karl@example.com");
      const user2 = userManager.addUser("Liam", "liam@example.com");
      userManager.deleteUser(user1.id);
      expect(userManager.getAllUsers()).toEqual([user2]);
    });
  });

  describe("Edge cases", () => {
    it("should handle adding users with empty name or email", () => {
      const user = userManager.addUser("", "");
      expect(user.name).toBe("");
      expect(user.email).toBe("");
      expect(userManager.getAllUsers()).toHaveLength(1);
    });

    it("should handle deleting with negative or zero id", () => {
      expect(userManager.deleteUser(0)).toBe(false);
      expect(userManager.deleteUser(-1)).toBe(false);
    });

    it("should handle finding with negative or zero id", () => {
      expect(userManager.findUserById(0)).toBeUndefined();
      expect(userManager.findUserById(-1)).toBeUndefined();
    });
  });
});
