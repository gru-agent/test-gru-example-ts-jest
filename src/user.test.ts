import { describe, it, expect, beforeEach } from '@jest/globals';

interface User {
  id: number;
  name: string;
  email: string;
}

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

describe('UserManager', () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  describe('addUser', () => {
    it('should add a new user with incremented id', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
      expect(user1.name).toBe('John');
      expect(user1.email).toBe('john@example.com');
      expect(userManager.getAllUsers()).toHaveLength(2);
    });

    it('should handle empty name and email', () => {
      const user = userManager.addUser('', '');
      expect(user.name).toBe('');
      expect(user.email).toBe('');
    });
  });

  describe('findUserById', () => {
    it('should find existing user by id', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const foundUser = userManager.findUserById(user.id);

      expect(foundUser).toEqual(user);
    });

    it('should return undefined for non-existing user id', () => {
      const foundUser = userManager.findUserById(999);
      expect(foundUser).toBeUndefined();
    });

    it('should return undefined for negative id', () => {
      const foundUser = userManager.findUserById(-1);
      expect(foundUser).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete existing user', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const result = userManager.deleteUser(user.id);

      expect(result).toBe(true);
      expect(userManager.getAllUsers()).toHaveLength(0);
      expect(userManager.findUserById(user.id)).toBeUndefined();
    });

    it('should return false when deleting non-existing user', () => {
      const result = userManager.deleteUser(999);
      expect(result).toBe(false);
    });

    it('should return false when deleting with negative id', () => {
      const result = userManager.deleteUser(-1);
      expect(result).toBe(false);
    });

    it('should only delete the specified user', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      userManager.deleteUser(user1.id);

      expect(userManager.getAllUsers()).toHaveLength(1);
      expect(userManager.findUserById(user2.id)).toEqual(user2);
    });
  });

  describe('getAllUsers', () => {
    it('should return empty array when no users exist', () => {
      expect(userManager.getAllUsers()).toEqual([]);
    });

    it('should return array of all users', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      expect(userManager.getAllUsers()).toEqual([user1, user2]);
    });

    it('should return users in order of insertion', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');
      const user3 = userManager.addUser('Bob', 'bob@example.com');

      const allUsers = userManager.getAllUsers();
      expect(allUsers[0]).toEqual(user1);
      expect(allUsers[1]).toEqual(user2);
      expect(allUsers[2]).toEqual(user3);
    });
  });
});
