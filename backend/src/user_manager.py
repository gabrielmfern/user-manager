from flask import Flask, jsonify, request
from user import User
import user

app = Flask(__name__)

@app.route("/")
def index():
    return jsonify({
        "message": "This is an example project to show off my skills. Welcme to the API!"
    })


@app.get("/users")
def get_users():
    return jsonify(user.get()), 200

@app.get("/users/<id>")
def get_user(id: str):
    resulting_user = user.get_by_id(id)
    if resulting_user is not None:
        return jsonify(resulting_user), 200
    else:
        return f"Could not find a user with the id {id}!", 404

@app.delete("/users/<id>")
def delete_user(id: str):
    result = user.delete(id)
    if result is not None:
        return jsonify(result), 200
    else:
        return f"Could not find a user with the id {id}!", 404

@app.put("/users")
def update_user():
    new_user_data: dict = dict(request.get_json())
    if new_user_data is not None:
        if "id" not in new_user_data:
            return "Missing 'id' in the update body!", 400

        result = user.update(User.from_dict(new_user_data))

        if result is not None:
            return f"Successfully updated the User with id {new_user_data['id']}", 200
        else:
            return f"Could not find a user with the id {id}!", 404
    else:
        return "Missing body in the update request!", 400

@app.post("/users")
def create_user():
    user_data: dict = dict(request.get_json())
    if user_data is not None:
        if "name" not in user_data:
            return "Missing name for the new user!", 400
        elif "email" not in user_data:
            return "Missing email for the new user!", 400
        elif "role" not in user_data:
            return "Missing role for the new user!", 400

        return user.create(User.from_dict(user_data)), 200
    else:
        return "Missing body in the user creation request!", 400
