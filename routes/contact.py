from flask import Blueprint, request, redirect, flash
from database.supabase import supabase

contact_bp = Blueprint("contact", __name__)

@contact_bp.route("/contact", methods=["POST"])
def submit_contact():
    try:
        data = {
            "fullname": request.form.get("name"),
            "phonenumber": request.form.get("phone"),
            "emailaddress": request.form.get("email"),
            "inquirytype": request.form.get("service"),
            "estimatedprojectvalue": request.form.get("budget"),
            "projectdetails": request.form.get("message")
        }

        response = (
            supabase
            .table("contactenquiries")
            .insert(data)
            .execute()
        )

        print("Supabase Response:", response)

        flash("Inquiry submitted successfully!", "success")

    except Exception as e:
        import traceback
        traceback.print_exc()
        print("Supabase Error:", e)
        flash("Failed to submit inquiry. Please try again.", "danger")

    return redirect("/")