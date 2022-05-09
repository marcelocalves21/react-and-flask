"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

""" JWT Modules """
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Login
@api.route("/login", methods=["POST"])
def login():
    body = request.get_json()
    if "email" not in body  or body['email'] == "":
        raise APIException("User not found", status_code=400)
    if "password" not in body  or body['password'] == "":
        raise APIException("User not found", status_code=400)
    
    user = User.query.filter_by(email=body['email']).first()

    if user == None:
        raise APIException("User not found", status_code=404)
    if body['email'] != user.email:
        raise APIException("User not found", status_code=400)
    else:
        access_token = create_access_token(identity=body['email'])
        return jsonify(access_token=access_token)


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200





######  All user endpoints ######
@api.route('/user', methods=['GET'])
def handle_users():

    users = User.query.all()
    users_list = list(map(lambda user: user.serialize(), users))

    return jsonify(users_list), 200


@api.route('/user/<int:user_id>', methods=['GET'])
def handle__one_user(user_id):

    user = User.query.get(user_id)
    if user == None:
         raise APIException("User not found", status_code=400)
    

    return jsonify(user.serialize()), 200


@api.route('/user', methods=['POST'])
def handle_add_user():

    # First we get the payload json
    body = request.get_json()

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'password' not in body:
        raise APIException('You need to specify the password', status_code=400)
    if 'email' not in body:
        raise APIException('You need to specify the email', status_code=400)
    if 'is_active' not in body:
        raise APIException('You need to specify the is_active', status_code=400)

    # at this point, all data has been validated, we can proceed to inster into the bd
    new_user = User(password=body['password'], email=body['email'], is_active=body['is_active'])
    db.session.add(new_user)
    db.session.commit()
    return f"User {body['email']} was successfully added", 200


@api.route('/user/<int:user_id>', methods=['PUT'])
def handle_update_user(user_id):

    # First we get the payload json
    body = request.get_json()
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)

    if "password" in body:
        user.password = body["password"]
    if "email" in body:
        user.email = body["email"]
    
    db.session.commit()

    return f"User was successfully updated", 200

@api.route('/user/<int:user_id>', methods=['DELETE'])
def handle_delete_user(user_id):

    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    db.session.delete(user)
    db.session.commit()
    return f"User was deleted successfully", 200
