from flask import Flask, jsonify, request


class API():
    def __init__(self, port):
        self.port = port
        self.app = Flask(__name__)

    