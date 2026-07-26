import os

from flask import Flask, render_template

from config import config
from routes.contact import contact_bp
from routes.services import services_bp

app = Flask(__name__)

config_name = os.getenv("FLASK_ENV", "default")
app.config.from_object(config[config_name])

# Register Blueprints
app.register_blueprint(contact_bp)
app.register_blueprint(services_bp)

@app.route("/")
def index():
    return render_template("index.html")

@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html"), 404

@app.errorhandler(500)
def internal_server_error(error):
    return render_template("500.html"), 500

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=app.config["DEBUG"]
    )