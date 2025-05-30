import { UserManager } from './user';

describe('UserManager', () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  describe('addUser', () => {
    it('should add a new user and return the user object', () => {
      const user = userManager.addUser('John Doe', 'john@example.com');

      expect(user).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      });
    });

    it('should increment the ID for each new user', () => {
      const user1 = userManager.addUser('John Doe', 'john@example.com');
      const user2 = userManager.addUser('Jane Doe', 'jane@example.com');

      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
    });
  });

  describe('findUserById', () => {
    it('should return the user with matching ID', () => {
      const addedUser = userManager.addUser('John Doe', 'john@example.com');

      const foundUser = userManager.findUserById(1);
      expect(foundUser).toEqual(addedUser);
    });

    it('should return undefined when user is not found', () => {
      const foundUser = userManager.findUserById(999);
      expect(foundUser).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete existing user and return true', () => {
      userManager.addUser('John Doe', 'john@example.com');

      const result = userManager.deleteUser(1);
      expect(result).toBe(true);
      expect(userManager.findUserById(1)).toBeUndefined();
    });

    it('should return false when trying to delete non-existent user', () => {
      const result = userManager.deleteUser(999);
      expect(result).toBe(false);
    });
  });

  describe('getAllUsers', () => {
    it('should return empty array when no users exist', () => {
      const users = userManager.getAllUsers();
      expect(users).toEqual([]);
    });

    it('should return array of all users', () => {
      const user1 = userManager.addUser('John Doe', 'john@example.com');
      const user2 = userManager.addUser('Jane Doe', 'jane@example.com');

      const users = userManager.getAllUsers();
      expect(users).toEqual([user1, user2]);
    });
  });
});
