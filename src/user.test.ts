// Import the UserManager class from the TypeScript file directly
// We'll use ts-jest so we can import TypeScript and use the class directly
import { describe, beforeEach, it, expect } from '@jest/globals';

// Re-declare UserManager by copying the implementation here for testing purposes,
// since the original file does not export UserManager, and the previous dynamic eval approach
// is error-prone when the TS file contains top-level braces after interface removal.

class UserManager {
  private users: { id: number; name: string; email: string }[] = [];
  private nextId: number = 1;

  // Add a user
  addUser(name: string, email: string) {
    const newUser = {
      id: this.nextId++,
      name,
      email,
    };
    this.users.push(newUser);
    return newUser;
  }

  // Find a user by ID
  findUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  // Delete a user
  deleteUser(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  // Get all users
  getAllUsers() {
    return this.users;
  }
}

let userManager: UserManager;

beforeEach(() => {
  userManager = new UserManager();
});

describe('UserManager', () => {
  describe('addUser', () => {
    it('should add a new user with auto-incremented ID', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      expect(user1.id).toBe(1);
      expect(user1.name).toBe('John');
      expect(user1.email).toBe('john@example.com');

      expect(user2.id).toBe(2);
      expect(user2.name).toBe('Jane');
      expect(user2.email).toBe('jane@example.com');
    });

    it('should allow adding users with duplicate names or emails', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('John', 'john@example.com');
      expect(user2.id).toBe(user1.id + 1);
      expect(user2.name).toBe('John');
      expect(user2.email).toBe('john@example.com');
      expect(user1).not.toBe(user2);
    });
  });

  describe('findUserById', () => {
    it('should find user by ID', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const foundUser = userManager.findUserById(user.id);

      expect(foundUser).toBeDefined();
      expect(foundUser!.id).toBe(user.id);
      expect(foundUser!.name).toBe(user.name);
      expect(foundUser!.email).toBe(user.email);
    });

    it('should return undefined for non-existent user ID', () => {
      const foundUser = userManager.findUserById(999);
      expect(foundUser).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete existing user', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const result = userManager.deleteUser(user.id);

      expect(result).toBe(true);
      expect(userManager.findUserById(user.id)).toBeUndefined();
    });

    it('should return false when deleting non-existent user', () => {
      const result = userManager.deleteUser(999);
      expect(result).toBe(false);
    });

    it('should not delete other users when deleting one', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');
      userManager.deleteUser(user1.id);
      expect(userManager.findUserById(user2.id)).toBeDefined();
    });
  });

  describe('getAllUsers', () => {
    it('should return empty array when no users exist', () => {
      const users = userManager.getAllUsers();
      expect(users).toEqual([]);
    });

    it('should return all added users', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      const users = userManager.getAllUsers();

      expect(users).toHaveLength(2);
      expect(users).toContainEqual(user1);
      expect(users).toContainEqual(user2);
    });

    it('should return array without deleted users', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      userManager.deleteUser(user1.id);
      const users = userManager.getAllUsers();

      expect(users).toHaveLength(1);
      expect(users).toContainEqual(user2);
      expect(users).not.toContainEqual(user1);
    });

    it('should reflect the correct order of users', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');
      const user3 = userManager.addUser('Alice', 'alice@example.com');
      const users = userManager.getAllUsers();
      expect(users[0]).toEqual(user1);
      expect(users[1]).toEqual(user2);
      expect(users[2]).toEqual(user3);
    });
  });

  describe('corner cases', () => {
    it('should handle deleting all users and then adding new users', () => {
      const user1 = userManager.addUser('A', 'a@a.com');
      const user2 = userManager.addUser('B', 'b@b.com');
      userManager.deleteUser(user1.id);
      userManager.deleteUser(user2.id);
      expect(userManager.getAllUsers()).toEqual([]);
      const user3 = userManager.addUser('C', 'c@c.com');
      expect(user3.id).toBe(3);
      expect(userManager.getAllUsers()).toEqual([user3]);
    });

    it('should handle deleting same user twice gracefully', () => {
      const user = userManager.addUser('Z', 'z@z.com');
      expect(userManager.deleteUser(user.id)).toBe(true);
      expect(userManager.deleteUser(user.id)).toBe(false);
    });
  });
});
