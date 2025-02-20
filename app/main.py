from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv
import os
import openai

load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

@app.get("/api/bloodwork/{patient_id}")
async def get_blood_work(patient_id: str):
    try:
        response = supabase.table("blood_work_results") \
            .select("*") \
            .eq("patient_id", patient_id) \
            .order("test_date", desc=True) \
            .execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/bloodwork/{patient_id}/concerns")
async def get_primary_concerns(patient_id: str):
    try:
        response = supabase.table("blood_work_results") \
            .select("*") \
            .eq("patient_id", patient_id) \
            .eq("is_primary_concern", True) \
            .order("test_date", desc=True) \
            .execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/summarize-concerns")
async def summarize_concerns(concerns: list):
    try:
        prompt = "Please summarize the following blood work results in an easy to understand way: \n"
        for concern in concerns:
            prompt += f"- {concern['metric_name']}: {concern['value']} {concern['unit']} "
            prompt += f"(Reference range: {concern['reference_low']}-{concern['reference_high']})\n"

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful medical assistant explaining blood work results."},
                {"role": "user", "content": prompt}
            ]
        )
        return {"summary": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 