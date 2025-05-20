import { UserManager } from './user';

describe('UserManager', () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  describe('addUser', () => {
    it('should add a user and return the new user with id, name, and email', () => {
      const user = userManager.addUser('Alice', 'alice@example.com');
      expect(user).toEqual({
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
      });
    });

    it('should increment user id for each added user', () => {
      const user1 = userManager.addUser('Bob', 'bob@example.com');
      const user2 = userManager.addUser('Charlie', 'charlie@example.com');
      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
    });
  });

  describe('findUserById', () => {
    it('should return the user with the given id', () => {
      const user = userManager.addUser('Dave', 'dave@example.com');
      const found = userManager.findUserById(user.id);
      expect(found).toEqual(user);
    });

    it('should return undefined if user with given id does not exist', () => {
      expect(userManager.findUserById(999)).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete the user with the given id and return true', () => {
      const user = userManager.addUser('Eve', 'eve@example.com');
      const result = userManager.deleteUser(user.id);
      expect(result).toBe(true);
      expect(userManager.findUserById(user.id)).toBeUndefined();
    });

    it('should return false if trying to delete a non-existing user', () => {
      expect(userManager.deleteUser(12345)).toBe(false);
    });

    it('should only delete the user with the specified id', () => {
      const user1 = userManager.addUser('Frank', 'frank@example.com');
      const user2 = userManager.addUser('Grace', 'grace@example.com');
      const result = userManager.deleteUser(user1.id);
      expect(result).toBe(true);
      expect(userManager.findUserById(user1.id)).toBeUndefined();
      expect(userManager.findUserById(user2.id)).toEqual(user2);
    });
  });

  describe('getAllUsers', () => {
    it('should return an empty array when no users have been added', () => {
      expect(userManager.getAllUsers()).toEqual([]);
    });

    it('should return all users that have been added', () => {
      const user1 = userManager.addUser('Heidi', 'heidi@example.com');
      const user2 = userManager.addUser('Ivan', 'ivan@example.com');
      expect(userManager.getAllUsers()).toEqual([user1, user2]);
    });

    it('should reflect deletion in the returned users array', () => {
      const user1 = userManager.addUser('Judy', 'judy@example.com');
      const user2 = userManager.addUser('Karl', 'karl@example.com');
      userManager.deleteUser(user1.id);
      expect(userManager.getAllUsers()).toEqual([user2]);
    });
  });

  describe('integration scenarios', () => {
    it('should handle adding, deleting, and adding again (id increments)', () => {
      const user1 = userManager.addUser('Leo', 'leo@example.com');
      userManager.deleteUser(user1.id);
      const user2 = userManager.addUser('Mona', 'mona@example.com');
      expect(user2.id).toBe(user1.id + 1);
    });

    it('should not affect other users when deleting a user', () => {
      const user1 = userManager.addUser('Nina', 'nina@example.com');
      const user2 = userManager.addUser('Oscar', 'oscar@example.com');
      userManager.deleteUser(user1.id);
      expect(userManager.getAllUsers()).toEqual([user2]);
    });
  });
});
