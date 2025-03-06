from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from keyrings.alt.file import EncryptedKeyring

#Variables
keyring = EncryptedKeyring()
app = Flask(__name__)
username = CHANGEME

#Setup
CORS(app)
password=keyring.get_password("space-trader", username)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://" + username +":" + password + "@localhost/spacetrader"
db = SQLAlchemy(app)

#SQL table models
class Agent(db.Model):
    __tablename__ = 'agent'

    id = db.Column(db.Integer, primary_key=True)
    acount_id = db.Column(db.String(255), unique = True, nullable = False)
    symbol = db.Column(db.String(255))
    headquarters = db.Column(db.String(255))
    credits = db.Column(db.Integer)
    starting_faction = db.Column(db.String(255))
    ship_count = db.Column(db.Integer)

    user_agent_info = db.relationship('UserAgentInfo', backref='agent',lazy=True)

class UserAgentInfo(db.Model):
    __tablename__='useragentinfo'

    user_id = db.Column(db.Integer, primary_key=True)
    acount_id = db.Column(db.String(255), db.ForeignKey('agent.acount_id'),nullable=False)
    agent_id = db.Column(db.Integer)
    agent_key = db.Column(db.String(255))

    agent = db.relationship('Agent', backref='user_agent_info',lazy=True)

#API calls
@app.route('/api/store-key', methods=['POST'])
def store_key():
    data = request.get_json()
    api_key = data.get('apiKey')

    #check if api key is empty and send error back if it is
    if not api_key:
        return jsonify({'error':'API key is missing.'}), 400
    
    #TODO make this store the API key
    print(f"Recieved API key: {api_key}")

    #TODO make logic that checks if the API key was actually stored
    return jsonify({'succes':'API key stored!'}), 200


with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000)