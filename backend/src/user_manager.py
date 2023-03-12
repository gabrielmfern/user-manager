from flask import Flask, json, jsonify, request
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
        return jsonify({
            "users": resulting_user,
            "status": "success",
        }), 200
    else:
        return jsonify({
            "message": f"Could not find a user with the id {id}!",
            "status": "error"
        }), 404

@app.delete("/users/<id>")
def delete_user(id: str):
    result = user.delete(id)
    if result is not None:
        return jsonify({
            "user": result,
            "status": "success"
        }), 200
    else:
        return jsonify({
            "message": f"Could not find a user with the id {id}!",
            "status": "error"
        }), 404

@app.put("/users")
def update_user():
    new_user_data: dict = dict(request.get_json())
    if new_user_data is not None:
        if "id" not in new_user_data:
            return jsonify({
                "message": "Missing 'id' in the update body!",
                "status": "error"
            }), 400

        result = user.update(User.from_dict(new_user_data))

        if result is not None:
            return jsonify({
                "message": f"Successfully updated the User with id {new_user_data['id']}",
                "status": "success"
            }), 200
        else:
            return jsonify({
                "message": f"Could not find a user with the id {id}!",
                "status": "error"
            }), 404
    else:
        return jsonify({
            "message": "Missing body in the update request!",
            "status": "error"
        }) , 400

@app.post("/users")
def create_user():
    user_data: dict = dict(request.get_json())
    if user_data is not None:
        if "name" not in user_data:
            return jsonify({
                "message": "Missing name for the new user!",
                "status": "error"
            }), 400
        elif "email" not in user_data:
            return jsonify({
                "message": "Missing email for the new user!",
                "status": "error"
            }), 400
        elif "role" not in user_data:
            return jsonify({
                "message": "Missing role for the new user!",
                "status": "error"
            }), 400

        return jsonify({
            "user_id": user.create(User.from_dict(user_data)),
            "status": "success"
        }), 200
    else:
        return jsonify({
            "message": "Missing body in the user creation request!",
            "status": "error"
        }), 400
