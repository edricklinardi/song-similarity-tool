from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import requests
import os
import time

load_dotenv()

SPOTIFY_CLIENT_ID = os.getenv("CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("CLIENT_SECRET")

app = FastAPI()

# Allow React frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # update if frontend uses different port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

access_token = None
token_expires_at = 0


def get_access_token():
    global access_token, token_expires_at
    if access_token and time.time() < token_expires_at:
        return access_token

    response = requests.post(
        "https://accounts.spotify.com/api/token",
        data={"grant_type": "client_credentials"},
        auth=(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET),
    )

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to get access token")

    data = response.json()
    access_token = data["access_token"]
    token_expires_at = time.time() + data["expires_in"]
    return access_token


@app.get("/search")
def search_track(query: str):
    token = get_access_token()
    headers = {"Authorization": f"Bearer {token}"}

    response = requests.get(
        "https://api.spotify.com/v1/search",
        headers=headers,
        params={"q": query, "type": "track", "limit": 5},
    )

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Search failed")

    return response.json()


@app.get("/recommendations")
def get_recommendations(seed_track_id: str):
    token = get_access_token()
    headers = {"Authorization": f"Bearer {token}"}

    response = requests.get(
        "https://api.spotify.com/v1/recommendations",
        headers=headers,
        params={
            "seed_tracks": seed_track_id,
            "limit": 5
        },
    )

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to get recommendations")

    return response.json()