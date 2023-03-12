import unittest

from user import *
import user

class TestUserMethods(unittest.TestCase):
    
    def test_from_dict(self):
        dict = {
            "id": "1"
        }
        user = User.from_dict(dict)
        self.assertEqual(user.name, None)
        self.assertEqual(user.email, None)
        self.assertEqual(user.role, None)
        self.assertEqual(user.id, "1")

        dict = {
            "name": "Gabriel",
            "email": "gabriel@email.com",
            "role": "Full-Stack Developer"
        }
        user = User.from_dict(dict)
        self.assertEqual(user.name, "Gabriel")
        self.assertEqual(user.email, "gabriel@email.com")
        self.assertEqual(user.role, "Full-Stack Developer")
        self.assertEqual(user.id, None)

    def test_user_class_update(self):
        user_1 = User("gabriel", "gabriel@email.com", "Full-Stack Developer")
        user_1.id = "my id"
        update_user = User(None, "gabriel@super_email.com", None)  
        user_1.update(update_user)

        self.assertEqual(user_1.id, "my id")
        self.assertEqual(user_1.name, "gabriel")
        self.assertEqual(user_1.email, "gabriel@super_email.com")
        self.assertEqual(user_1.role, "Full-Stack Developer")

    def test_get_by_id(self):
        example_user = User("user", "email", "role")
        example_user.id = "12345"
        user.users = [example_user]
        self.assertEqual(get_by_id("12345"), example_user)
        self.assertEqual(get_by_id("1234"), None)
        self.assertEqual(get_by_id(None), None)

    def test_delete(self):
        example_user = User("user", "email", "role")
        example_user.id = "12345"
        other_user = User("other user", "email", "role")
        other_user.id = "123456"
        user.users = [example_user, other_user]
        delete("12345")
        self.assertEquals(user.users, [other_user])

    def test_update(self):
        example_user = User("user", "email", "role")
        example_user.id = "12345"
        other_user = User("other user", "email", "role")
        other_user.id = "123456"
        user.users = [example_user, other_user]

        update_user = User("", "", "")
        update_user.id = "123456"
        update(update_user)

        self.assertEquals(user.users[1].name, "")
        self.assertEquals(user.users[1].email, "")
        self.assertEquals(user.users[1].role, "")

if __name__ == '__main__':
    unittest.main()
