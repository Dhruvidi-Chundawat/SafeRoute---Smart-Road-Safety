from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from models.user import db, User
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "accident_model.pkl")

model = joblib.load(model_path)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/")
def home():
    return "Backend Running"


@app.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    name = data["name"]
    email = data["email"]
    password = data["password"]

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({"message": "Email already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    new_user = User(
        name=name,
        email=email,
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"})

@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data["email"]
    password = data["password"]

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({
            "message": "Login successful",
            "name": user.name
        }), 200

    return jsonify({
        "message": "Invalid email or password"
    }), 401

@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    features = pd.DataFrame([{
        "Temperature(F)": data["temperature"],
        "Humidity(%)": data["humidity"],
        "Pressure(in)": data["pressure"],
        "Visibility(mi)": data["visibility"],
        "Wind_Speed(mph)": data["wind_speed"],
        "Weather_Condition": data["weather_condition"],
        "Amenity": data["amenity"],
        "Crossing": data["crossing"],
        "Junction": data["junction"],
        "Railway": data["railway"],
        "Stop": data["stop"],
        "Traffic_Signal": data["traffic_signal"],
        "Sunrise_Sunset": data["sunrise_sunset"],
        "Civil_Twilight": data["civil_twilight"]
    }])

    prediction = model.predict(features)[0]

    risk = "High Risk" if prediction == 1 else "Low Risk"

    return jsonify({
        "prediction": risk
    })


if __name__ == "__main__":
    app.run(debug=True)