from flask import Blueprint, render_template

services_bp = Blueprint(
    "services",
    __name__,
    url_prefix="/services"
)

@services_bp.route("/government-building")
def government_building():
    return render_template("services/government_building.html")

@services_bp.route("/roads")
def roads():
    return render_template("services/roads.html")

@services_bp.route("/power")
def power():
    return render_template("services/power.html")

@services_bp.route("/water")
def water():
    return render_template("services/water.html")

@services_bp.route("/bridges")
def bridges():
    return render_template("services/bridges.html")

@services_bp.route("/smart-city")
def smart_city():
    return render_template("services/smart_city.html")

@services_bp.route("/environment")
def environment():
    return render_template("services/environment.html")

@services_bp.route("/industrial")
def industrial():
    return render_template("services/industrial.html")

@services_bp.route("/healthcare")
def healthcare():
    return render_template("services/healthcare.html")

@services_bp.route("/education")
def education():
    return render_template("services/education.html")

@services_bp.route("/housekeeping")
def housekeeping():
    return render_template("services/housekeeping.html")