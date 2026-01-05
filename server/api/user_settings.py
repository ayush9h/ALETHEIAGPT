from fastapi import APIRouter
from schemas.user_pref import UserPrefs

user_router = APIRouter(prefix="/v1/users")


@user_router.post(
    "/preferences",
    tags=["user_preferences"],
    description="Store the updated user preference",
)
async def store_user_pref(payload: UserPrefs):
    try:
        # response = store_user_preferences(payload)
        # Function which would store the user prefernces in a database, and fetcehd from redis.
        # If there is an update to the preferences, remove from redis.

        return {
            "status": "success",
            "message": "User preferences updated successfully",
            "code": 200,
        }
    except Exception as e:
        return {
            "status": "failure",
            "message": f"Error occurred due to {e}",
            "code": 400,
        }
