import firebase_admin
import firestore_model
from firebase_admin import credentials
from firebase_admin import firestore

from pathlib import Path


# Use a service account
cred = credentials.Certificate(
    str(Path.home() / "lets-hang-out-6f3e2-b912c1b4991d.json")
)
firebase_admin.initialize_app(cred)

firestore_model.db = firestore.client()
_db = firestore_model.db
