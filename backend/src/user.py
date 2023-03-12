from dataclasses import dataclass
from datetime import datetime

@dataclass
class User:
    """Class that represents the information contained in a User"""
    id: str | None
    name: str | None
    email: str | None
    role: str | None
    creation_time: datetime | None
    update_time: datetime | None

    def __init__(
        self,
        name: str | None, 
        email: str | None, 
        role: str | None, 
    ):
        self.id = None
        self.name = name
        self.email = email
        self.role = role
        self.creation_time = datetime.now()
        self.update_time = None

    @staticmethod
    def from_dict(payload: dict):
        new_user = User(
            str(payload['name']) if 'name' in payload else None, 
            str(payload['email']) if 'email' in payload else None, 
            str(payload['role']) if 'role' in payload else None
        )
        if 'id' in payload:
            new_user.id = str(payload['id'])
        return new_user

    def update(self, other) -> None:
        if other.name is not None:
            self.name = other.name

        if other.email is not None:
            self.email = other.email

        if other.role is not None:
            self.role = other.role

        self.update_time = datetime.now()

def get() -> list[User]:
    return users

def get_by_id(id: str | None) -> User | None:
    filter_list = [user for user in users if user.id == id]
    if len(filter_list) > 0:
        return filter_list[0]

    return None

def delete(id: str) -> User | None:
    user = get_by_id(id)
    if user is not None:
        users.pop(users.index(user))
    return user

def update(user: User) -> User | None:
    current_user = get_by_id(user.id)
    if current_user is not None:
        index = users.index(current_user)
        users[index].update(user)
    return current_user

def create(user: User) -> str:
    user.id = str(len(users) + 1)
    users.append(user)
    return user.id

users: list[User] = [
]

create(User(
    "Gabriel", 
    "gabriel@email.com", 
    "Full-stack Developer", 
))
create(User(
    "Rafael", 
    "rafa@email.com", 
    "Gerente de projetos", 
))
create(User(
    "Derick",
    "derick@email.com",
    "SEO Expert",
))
