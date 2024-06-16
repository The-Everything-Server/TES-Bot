from utils.database import Database
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/db', methods=["POST"])
def runDBCommand():
    data = request.get_json()

    db = Database(data["file"]).execute(data["query"])

    return jsonify({"Result": db})

