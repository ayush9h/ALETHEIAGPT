from app.schemas.session_schema import CreateSessionRequest


def test_session_request():
    payload = {"user_id": "123"}

    req = CreateSessionRequest(**payload)  # type: ignore

    assert req.user_id == "123"
