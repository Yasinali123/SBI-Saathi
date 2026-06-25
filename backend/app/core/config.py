from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
from typing import List


class Settings(BaseSettings):
    gemini_api_key: str = ""
    allowed_origins: str = "http://localhost:5173,http://localhost:3000,https://sbi-saathi.vercel.app,https://sbi-saathi-git-main-sbi-saathi.vercel.app"
    app_env: str = "development"
    debug: bool = True

    @property
    def origins_list(self) -> List[str]:
        return [o.strip() for o in self.allowed_origins.split(",")]

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False, extra="ignore")


@lru_cache()
def get_settings() -> Settings:
    return Settings()
