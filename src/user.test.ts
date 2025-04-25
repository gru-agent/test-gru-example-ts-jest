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
    return [...this.users];
  }
}

describe('UserManager', () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  describe('addUser', () => {
    it('should add a user and return the user object', () => {
      const user = userManager.addUser('John Doe', 'john@example.com');

      expect(user).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      });
    });

    it('should increment the ID for each new user', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
    });

    it('should store the user in the users array', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const users = userManager.getAllUsers();

      expect(users).toContainEqual(user);
    });
  });

  describe('findUserById', () => {
    it('should find a user by ID', () => {
      const addedUser = userManager.addUser('John', 'john@example.com');
      const foundUser = userManager.findUserById(addedUser.id);

      expect(foundUser).toEqual(addedUser);
    });

    it('should return undefined for non-existent ID', () => {
      const foundUser = userManager.findUserById(999);
      expect(foundUser).toBeUndefined();
    });

    it('should return undefined for negative ID', () => {
      const foundUser = userManager.findUserById(-1);
      expect(foundUser).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete an existing user and return true', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const result = userManager.deleteUser(user.id);

      expect(result).toBe(true);
      expect(userManager.findUserById(user.id)).toBeUndefined();
    });

    it('should return false when trying to delete non-existent user', () => {
      const result = userManager.deleteUser(999);
      expect(result).toBe(false);
    });

    it('should not affect other users when deleting', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      userManager.deleteUser(user1.id);

      expect(userManager.findUserById(user2.id)).toEqual(user2);
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

      expect(users).toEqual([user1, user2]);
    });

    it('should return a copy of users array', () => {
      userManager.addUser('John', 'john@example.com');
      const users1 = userManager.getAllUsers();
      const users2 = userManager.getAllUsers();

      expect(users1).toEqual(users2);
      expect(users1).not.toBe(users2);
    });

    it('should maintain user order based on insertion', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');
      const user3 = userManager.addUser('Bob', 'bob@example.com');

      const users = userManager.getAllUsers();

      expect(users).toEqual([user1, user2, user3]);
    });
  });
});

export { User, UserManager };
