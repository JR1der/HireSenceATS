import os
from django.conf import settings
from google import genai
from typing import List
from pydantic import BaseModel
import pymupdf
import re
from dotenv import load_dotenv

load_dotenv()


def extract_text_from_pdf(filename):
    doc = pymupdf.open(filename)
    return clean_text('\n'.join([page.get_text() for page in doc]))


def clean_text(text):
    # Patterns for emails and phone numbers
    email_pattern = r'\b[\w\.-]+@[\w\.-]+\.\w+\b'
    phone_pattern = r'\+?\d[\d\s\-\(\)]{8,}\d'

    # Extract emails and phone numbers
    emails = re.findall(email_pattern, text)
    phones = re.findall(phone_pattern, text)

    # Replace emails and phone numbers with placeholders
    for i, email in enumerate(emails):
        text = text.replace(email, f'__EMAIL_{i}__')

    for i, phone in enumerate(phones):
        text = text.replace(phone, f'__PHONE_{i}__')

    # Remove newlines
    text = re.sub(r'\r?\n', ' ', text)

    # Remove URLs
    text = re.sub(r'https?://\S+|www\.\S+', ' ', text)

    # Remove unwanted characters (you can tweak this to allow some punctuation if needed)
    text = re.sub(r'[^\w\s]', ' ', text)

    # Normalize multiple spaces
    text = re.sub(r'\s+', ' ', text).strip()

    # Restore emails and phone numbers
    for i, email in enumerate(emails):
        text = text.replace(f'__EMAIL_{i}__', email)

    for i, phone in enumerate(phones):
        text = text.replace(f'__PHONE_{i}__', phone)

    return text


class ATSAnalysis(BaseModel):
    ats_score: int
    cv_skills: List[str]
    required_skills: List[str]
    improvements: list[str]


def get_ats_score(job_description, resume_text):
    prompt = """
        You are an AI specializing in evaluating resumes against job descriptions with high accuracy.  
        Your task is to analyze the resume and job description carefully and return the following structured information in JSON format.  
        Evaluate resumes strictly and ensure that the score accurately reflects the match.  

        **Handling missing or meaningless input:**  
        - If the resume text is missing, empty, or consists of random words/sentences without professional relevance, return:
          - `"ats_score": 0`
          - `"cv_skills": []`
          - `"required_skills": []`
          - `"improvements": ["Please provide a valid resume to analyze."]`
        - If the job description is missing or empty, return:
          - `"ats_score": 0`
          - `"cv_skills": []`
          - `"required_skills": []`
          - `"improvements": ["Please provide a job description to compare with the resume."]`

        **Detecting meaningless content:**  
        - If the resume contains only generic, unrelated, or incoherent text (e.g., "lorem ipsum", "random data", or a list of common words without structure), treat it as meaningless and return a score of 0.
        - If the resume lacks relevant job experience, skills, or industry-related terms, significantly lower the score.
        - If job title and experience levels are vastly mismatched (e.g., an entry-level resume for a senior-level job), significantly lower the score.

        1. **Matching Percentage (`ats_score`)**: A numerical percentage (0-100) representing how well the resume matches the job description.
           - This should be based on the overlap of skills, experience, education, and job-specific keywords.
           - Prioritize technical skills, job title similarity, required certifications, and relevant experience.
           - If a junior-level resume is compared to a senior-level job description, significantly lower the score.
           - Do not overestimate matches based on generic terms.

        2. **Detected Skills (`cv_skills`)**: A list of specific skills extracted from the resume.
           - Identify both hard and soft skills that are relevant to the job.
           - Extract tools, technologies, methodologies, and certifications explicitly mentioned.

        3. **Required Skills (`required_skills`)**: A list of skills explicitly mentioned in the job description as necessary.
           - Include both technical and soft skills.
           - If skills are indirectly mentioned (e.g., "experience with modern frameworks"), infer relevant technologies.

        4. **Suggested Improvements (`improvements`)**: Actionable suggestions to improve the resume for a better match.
           - List missing skills or qualifications required by the job description.
           - Suggest better wording or formatting if necessary.
           - Highlight weak areas such as missing certifications, unclear job titles, or lack of relevant keywords.

        Return the response in **valid JSON format** following this schema:
        {
            "ats_score": int, 
            "cv_skills": list[str], 
            "required_skills": list[str], 
            "improvements": list[str]
        }

        Ensure that your evaluation prioritizes job relevance and industry standards.
    """
    prompt += f"""
    **CV Text:**
    {resume_text}

    **Job Description:**
    {job_description}
    """

    try:
        client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            config={
                'response_mime_type': 'application/json',
                'response_schema': ATSAnalysis,
            },
            contents=prompt,
        )

        response_data = response.text
        print(f"Printed: {response_data}")

        ats_result: ATSAnalysis = response.parsed
        return ats_result

    except Exception as e:
        print(f"Error during API request or response parsing: {e}")
        return None


def process_cv_and_job_description():
    cv_path = os.path.join(settings.MEDIA_ROOT, 'cv.pdf')
    job_desc_path = os.path.join(settings.MEDIA_ROOT, 'job_description.txt')

    if os.path.exists(cv_path) and os.path.exists(job_desc_path):
        resume_text = extract_text_from_pdf(cv_path)

        with open(job_desc_path, 'r', encoding='utf-8') as file:
            job_description = file.read()

        ats_result = get_ats_score(job_description, resume_text)

        if ats_result:
            result_data = ats_result.model_dump()
        else:
            result_data = {
                "ats_score": 0,
                "cv_skills": [],
                "required_skills": [],
                "improvements": []
            }

    return result_data
