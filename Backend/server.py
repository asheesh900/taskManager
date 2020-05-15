from flask import Flask, request
from flask_mysqldb import MySQL
import json
import os
import base64
import hashlib
import jwt

app = Flask(__name__)
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '@ps123'
app.config['MYSQL_DB'] = 'task_manager'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)

# Create a new task

@app.route('/create', methods = ['POST'])
def createTask():
    ask = request.json
    task_name = ask['task_name']
    project_name = ask['project_name']
    user_id = token_decoder()['id']
    print(user_id)
    start_time = ask['start_time']
    end_time = ask['end_time']

    query1 = """SELECT id FROM projects WHERE project_name = %s"""
    query2 = """INSERT INTO tasks (task_name, project_id, user_id, start_time, end_time) VALUES (%s, %s, %s, %s, %s)"""

    cursor = mysql.connection.cursor()
    cursor.execute(query1,(project_name,))
    result = cursor.fetchall()
    project_id = result[0]["id"]

    cursor.execute(query2, (task_name, project_id, user_id, start_time, end_time))
    mysql.connection.commit()
    cursor.close()
    return {"message": "Task created successfully"}

# Get all the previous tasks of a user

@app.route('/tasks', methods = ["GET"])
def tasks():
    user_id = token_decoder()['id']
    
    query = """SELECT tasks.id AS task_id, task_name,
     projects.project_name AS project_name, users.name,
     users.username, users.email, start_time, end_time
     from tasks LEFT JOIN projects ON
     projects.id = tasks.project_id LEFT JOIN users 
     ON users.id = tasks.user_id WHERE user_id = %s ORDER BY start_time ASC """

    cursor = mysql.connection.cursor()
    cursor.execute(query, (user_id,))
    result = cursor.fetchall()
    cursor.close()
    
    task_list = list()
    for item in result:
        task_list.append(item)
    
    return {"tasks":task_list}

# get all the projects

@app.route('/projects', methods = ['GET'])
def getProjects():
    query = """SELECT * FROM projects"""
    cursor = mysql.connection.cursor()
    cursor.execute(query)
    result = cursor.fetchall()
    cursor.close()
    
    project_list = list()
    for item in result:
        project_list.append(item)

    return {"projects": project_list}

# Authentication

@app.route('/auth/signup', methods = ['POST'])
def signup():
    ask = request.json
    name = ask['name']
    username = ask['username']
    email = ask['email']
    password = ask['password']

    salt = generate_salt()
    salted_password = salt + password
    hashed_password = hash_cycle(salted_password)

    cursor = mysql.connection.cursor()
    cursor.execute(
        """INSERT INTO users (name, username, email, salt, hashed_password)
        VALUES (%s, %s, %s, %s, %s)""",
        ((name), (username), (email), (salt), (hashed_password))
    )
    mysql.connection.commit()
    cursor.close()
    return {"message": "Signup Successful"}

@app.route('/auth/login', methods = ['POST'])
def login():
    ask = request.json
    email = ask['email']
    password = ask['password']
    cursor = mysql.connection.cursor()
    cursor.execute(
        """SELECT * FROM users WHERE
         email = %s""", (str(email),)
    )
    result = cursor.fetchall()
    cursor.close()
    user_data = list()
    for item in result:
        user_data.append(item)
    if len(user_data) is not 0:
        for user in user_data:
            if user["hashed_password"] == hash_cycle(user["salt"] + password):
                encode_data = jwt.encode({"id": user["id"]}, 'masai', algorithm='HS256')
                return json.dumps({"message": "Signin Successful!", "username": user["username"], "token": str(encode_data)})
            else:
                return {"message": "Wrong Password"}
    return {"message": "Please make sure you are a registered user."}

def generate_salt():
    salt = os.urandom(16)
    # print(salt.encode('base-64'))
    return str(base64.b64encode(salt))

def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    # print(hash.hexdigest())
    return hash.hexdigest()

def hash_cycle(string):
    for i in range(10):
        string = md5_hash(string)
    return string

def token_decoder():
    auth_header = request.headers.get("Authorization")
    token_encoded = auth_header.split(" ")[1]
    decode_data = jwt.decode(token_encoded, "masai", algorithm = ["HS256"])
    return decode_data