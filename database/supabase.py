import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SECRET_KEY")

print("URL:", repr(SUPABASE_URL))
print("KEY:", repr(SUPABASE_KEY[:20] if SUPABASE_KEY else None))

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)