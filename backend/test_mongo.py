import os
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from dotenv import load_dotenv
from pathlib import Path

async def test_conn():
    load_dotenv(Path(__file__).parent / '.env')
    mongo_url = os.environ.get('MONGO_URL')
    print(f"Testing connection to: {mongo_url}")
    try:
        client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=2000)
        await client.admin.command('ping')
        print("MongoDB connection SUCCESSFUL!")
    except Exception as e:
        print(f"MongoDB connection FAILED: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(test_conn())
