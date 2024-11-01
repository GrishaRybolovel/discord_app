from fastapi import APIRouter
import json
import os
import requests
from fastapi import HTTPException
from .crud import check_id_exists, add_id, delete_id, get_all_ids
from .models import IdCheckRequest

validate_router = APIRouter(tags=['Validate'], prefix='/validate')

ACCESS_KEY = os.environ.get("ACCESS_KEY")

@validate_router.post("/check-id")
async def check_id(request: IdCheckRequest):
    if check_id_exists(request.id):
        return {"exists": True}
    else:
        return {"exists": False}

@validate_router.post("/add-id")
async def add_id_endpoint(request: IdCheckRequest):
    if request.access_key != ACCESS_KEY:
        raise HTTPException(status_code=401, detail="Invalid access key")
    add_id(request.id)
    return {"message": "ID added successfully"}

@validate_router.post("/delete-id")
async def delete_id_endpoint(request: IdCheckRequest):
    if request.access_key != ACCESS_KEY:
        raise HTTPException(status_code=401, detail="Invalid access key")
    delete_id(request.id)
    return {"message": "ID deleted successfully"}

@validate_router.get("/get-all-ids")
async def get_all_ids_endpoint(access_key: str):
    if access_key != ACCESS_KEY:
        raise HTTPException(status_code=401, detail="Invalid access key")
    return get_all_ids()