from fastapi import APIRouter
import json
import os
import requests
from fastapi import HTTPException, Request
from fastapi.responses import RedirectResponse

auth_router = APIRouter(tags=['Auth'], prefix='/auth')

DISCORD_CLIENT_ID = os.environ.get("DISCORD_CLIENT_ID")
DISCORD_CLIENT_SECRET = os.environ.get("DISCORD_CLIENT_SECRET")
REDIRECT_URI = os.environ.get("REDIRECT_URI")
FRONTEND_URI = os.environ.get("FRONTEND_URI")
PERMISSIONS = os.environ.get("PERMISSIONS")

@auth_router.get("/discord")
async def discord_login():
    """
    Redirects to Discord OAuth2 authorization URL.
    """
    discord_auth_url = (
        "https://discord.com/api/oauth2/authorize"
        f"?client_id={DISCORD_CLIENT_ID}"
        f"&redirect_uri={REDIRECT_URI}"
        "&response_type=code"
        "&scope=identify%20email"
    )
    return RedirectResponse(discord_auth_url)

@auth_router.get("/discord/invite")
async def discord_login():
    """
    Redirects to Discord OAuth2 invite URL.
    """
    discord_invite_url = (
        "https://discord.com/api/oauth2/authorize"
        f"?client_id={DISCORD_CLIENT_ID}"
        f"&permissions={PERMISSIONS}&"
        "&scope=bot"
    )
    return RedirectResponse(discord_invite_url)


@auth_router.get("/discord/callback")
async def discord_callback(request: Request):
    """
    Handles the callback from Discord OAuth2, exchanges the code for an access token,
    and fetches the user data.
    """
    code = request.query_params.get("code")

    if not code:
        raise HTTPException(status_code=400, detail="Authorization code missing")

    # Exchange the code for an access token
    token_url = "https://discord.com/api/oauth2/token"
    token_data = {
        "client_id": DISCORD_CLIENT_ID,
        "client_secret": DISCORD_CLIENT_SECRET,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    token_response = requests.post(token_url, data=token_data, headers=headers)
    token_json = token_response.json()

    print("Discord response:", token_json)

    if "access_token" not in token_json:
        raise HTTPException(status_code=400, detail="Failed to obtain access token")

    access_token = token_json["access_token"]

    # Fetch the user's profile information
    user_url = "https://discord.com/api/users/@me"
    headers = {"Authorization": f"Bearer {access_token}"}
    user_response = requests.get(user_url, headers=headers)
    user_data = user_response.json()

    # Redirect to frontend with user data
    user_data_encoded = requests.utils.quote(json.dumps(user_data))
    redirect_url = f"{FRONTEND_URI}/?user={user_data_encoded}"
    return RedirectResponse(redirect_url)

def main():
    print(DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, REDIRECT_URI, FRONTEND_URI)

if __name__ == "__main__":
    main()