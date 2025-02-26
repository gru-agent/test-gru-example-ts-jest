import { UserManager } from './user';

describe('UserManager', () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  describe('addUser', () => {
    it('should add a new user with correct id', () => {
      const user = userManager.addUser('John Doe', 'john@example.com');

      expect(user).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      });
    });

    it('should increment id for each new user', () => {
      const user1 = userManager.addUser('John Doe', 'john@example.com');
      const user2 = userManager.addUser('Jane Doe', 'jane@example.com');

      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
    });

    it('should add user to internal users array', () => {
      const user = userManager.addUser('John Doe', 'john@example.com');
      const allUsers = userManager.getAllUsers();

      expect(allUsers).toContain(user);
      expect(allUsers.length).toBe(1);
    });
  });

  describe('findUserById', () => {
    it('should find existing user by id', () => {
      const addedUser = userManager.addUser('John Doe', 'john@example.com');
      const foundUser = userManager.findUserById(addedUser.id);

      expect(foundUser).toEqual(addedUser);
    });

    it('should return undefined for non-existent user id', () => {
      const foundUser = userManager.findUserById(999);
      expect(foundUser).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete existing user and return true', () => {
      const user = userManager.addUser('John Doe', 'john@example.com');
      const result = userManager.deleteUser(user.id);

      expect(result).toBe(true);
      expect(userManager.findUserById(user.id)).toBeUndefined();
    });

    it('should return false when deleting non-existent user', () => {
      const result = userManager.deleteUser(999);
      expect(result).toBe(false);
    });

    it('should not affect other users when deleting', () => {
      const user1 = userManager.addUser('John Doe', 'john@example.com');
      const user2 = userManager.addUser('Jane Doe', 'jane@example.com');

      userManager.deleteUser(user1.id);

      expect(userManager.findUserById(user2.id)).toEqual(user2);
      expect(userManager.getAllUsers().length).toBe(1);
    });
  });

  describe('getAllUsers', () => {
    it('should return empty array when no users exist', () => {
      const users = userManager.getAllUsers();
      expect(users).toEqual([]);
    });

    it('should return array of all added users', () => {
      const user1 = userManager.addUser('John Doe', 'john@example.com');
      const user2 = userManager.addUser('Jane Doe', 'jane@example.com');

      const allUsers = userManager.getAllUsers();

      expect(allUsers).toEqual([user1, user2]);
      expect(allUsers.length).toBe(2);
    });
  });
});
