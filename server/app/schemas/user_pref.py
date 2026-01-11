from pydantic import BaseModel, Field


class UserPref(BaseModel):
    # user_id: int = Field(..., description="Unique ID of user")
    userCustomInstruction: str = Field(
        "",
        description="Custom system instructions provided by the user",
    )
    userPronouns: str = Field(
        "",
        description="User nickname or pronouns",
    )
    userHobbies: str = Field(
        "",
        description="Additional personal context about the user",
    )
