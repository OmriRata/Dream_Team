from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import os
from datetime import timedelta
from dotenv import load_dotenv 
from Users.user import user
from api.api import api

load_dotenv()

app = Flask(__name__)
CORS(app,supports_credentials=True)

app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=15)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY');
jwt = JWTManager(app)

app.register_blueprint(user,url_prefix='/users')
app.register_blueprint(api,url_prefix='/api')


if __name__ == "__main__":
    app.run(debug=True)