from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from keyrings.alt.file import EncryptedKeyring

keyring = EncryptedKeyring()
app = Flask(__name__)


CORS(app)
password=keyring.get_password("space-trader", "bitterguy")
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://bitterguy:{password}@localhost/spacetrader"

db = SQLAlchemy(app)
class agent(db.Model):
    id = db.Column(db.Integer, primary_key=True)

