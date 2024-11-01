from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.router import auth_router
from validate.router import validate_router

app = FastAPI(title="discord bot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth_router)
app.include_router(validate_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8009, reload=True)
