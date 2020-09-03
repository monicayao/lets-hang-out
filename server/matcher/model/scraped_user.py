from dataclasses import dataclass, field
from typing import List


@dataclass
class ScrapedUser:
    profile_picture: str = ""
    insights: List[str] = field(default_factory=lambda: [])
    name: str = ""
    position: str = ""
    email: str = ""
    office_phone_number: str = ""
    mobile_phone_number: str = ""
    started: str = ""
    location: str = ""
    teams: List[str] = field(default_factory=lambda: [])
    what_i_do: str = ""
    words_of_wisdom: str = ""
