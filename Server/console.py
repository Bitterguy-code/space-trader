from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from keyrings.alt.file import EncryptedKeyring
import requests

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

#SQL functions
def get_user_agent_info():
    user_agents = UserAgentInfo.query.all()
    user_agent_list = [
        {'user_id':user_agent.user_id,
         'acount_id':user_agent.acount_id,
         'agent_id':user_agent.agent_id,
         'agent_key':user_agent.agent_key}
         for user_agent in user_agents
    ]

    return user_agent_list

def set_user_agent_info():
    if apiKey == '':
        return ['No API Key in memory', False]
    
    user_agents = get_user_agent_info()
    for user_agent in user_agents:
        if apiKey == user_agent['agent_key']:
            return ['Already stored', False]
    
    agent = fetch_agent()



#API calls
apiKey = ''
@app.route('/api/set-key', methods=['POST'])
def set_key():
    """_summary_
    receives api key submission from the client. Checks if it is valid, then if it is stored. If it is valid and not stored then it stores it. Otherwise it returns an error

    Returns:
        array: [json-object('succes/fail':'message'),http code]
    """
    data = request.get_json()
    api_key = data.get('new_api_key')

    #check if api key is empty and send error back if it is
    if not api_key:
        return jsonify({'error':'API key is missing.'}), 400
    
    #TODO make this store the API key
    print(f"Recieved API key: {api_key}")
    global apiKey
    apiKey = api_key


    #TODO make logic that checks if the API key was actually stored
    return jsonify({'succes':'API key stored!'}), 200

@app.route('/api/fetch-agent', methods=['POST'])
def fetch_agent():
    #setup spacetrader api call and header options
    url = 'https://api.spacetraders.io/v2/my/agent'
    headers = {
        'content-type':'application/json',
        'authorization':f'Bearer {apiKey}'
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        #TODO call a storage function to storeagent data in the sql database
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({'error':str(e)}), 500



with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000,debug=False)