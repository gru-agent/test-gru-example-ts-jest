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
      expect(user2.name).toBe('Jane');
      expect(user2.email).toBe('jane@example.com');
    });

    it('should add user with empty name and email', () => {
      const user = userManager.addUser('', '');
      expect(user.name).toBe('');
      expect(user.email).toBe('');
    });
  });

  describe('findUserById', () => {
    it('should find user by id when user exists', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const foundUser = userManager.findUserById(user.id);

      expect(foundUser).toBeDefined();
      expect(foundUser?.id).toBe(user.id);
      expect(foundUser?.name).toBe(user.name);
      expect(foundUser?.email).toBe(user.email);
    });

    it('should return undefined when user does not exist', () => {
      const foundUser = userManager.findUserById(999);
      expect(foundUser).toBeUndefined();
    });

    it('should return undefined when searching with negative id', () => {
      const foundUser = userManager.findUserById(-1);
      expect(foundUser).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete existing user and return true', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const result = userManager.deleteUser(user.id);

      expect(result).toBe(true);
      expect(userManager.findUserById(user.id)).toBeUndefined();
    });

    it('should return false when trying to delete non-existent user', () => {
      const result = userManager.deleteUser(999);
      expect(result).toBe(false);
    });

    it('should return false when trying to delete with negative id', () => {
      const result = userManager.deleteUser(-1);
      expect(result).toBe(false);
    });

    it('should only delete the specified user', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      userManager.deleteUser(user1.id);

      expect(userManager.findUserById(user2.id)).toBeDefined();
      expect(userManager.getAllUsers()).toHaveLength(1);
    });
  });

  describe('getAllUsers', () => {
    it('should return empty array when no users exist', () => {
      const users = userManager.getAllUsers();
      expect(users).toEqual([]);
    });

    it('should return array of all users', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      const users = userManager.getAllUsers();

      expect(users).toHaveLength(2);
      expect(users).toContainEqual(user1);
      expect(users).toContainEqual(user2);
    });

    it('should return users in order of addition', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');
      const user3 = userManager.addUser('Bob', 'bob@example.com');

      const users = userManager.getAllUsers();

      expect(users[0]).toEqual(user1);
      expect(users[1]).toEqual(user2);
      expect(users[2]).toEqual(user3);
    });
  });
});
