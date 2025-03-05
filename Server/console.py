from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from keyrings.alt.file import EncryptedKeyring

keyring = EncryptedKeyring()
app = Flask(__name__)
username = ""

CORS(app)
password=keyring.get_password("space-trader", "{username}")
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://{username}:{password}@localhost/spacetrader"

db = SQLAlchemy(app)
class agent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    acount_id = db.Column(db.String(255))
    symbol = db.Column(db.String(255))
    headquarters = db.Column(db.String(255))
    credits = db.Column(db.integer)
    starting_faction = db.Column(db.String(255))
    ship_count = db.Column(db.Integer)

class useragentinfo(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255))
    agent_id = db.Column(db.Integer)
    agent_key = db.Column(db.String(255))

