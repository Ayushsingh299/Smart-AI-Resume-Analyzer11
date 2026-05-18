import os
import google.generativeai as genai
from typing import List, Dict, Optional

class ResumeRewriter:
    def __init__(self):
        # Configure Gemini API
        # Expecting GOOGLE_API_KEY in environment variables
        self.api_key = os.getenv("GOOGLE_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.model = None

    def rewrite_bullet_points(self, bullets: List[str], job_description: Optional[str] = None) -> List[str]:
        """
        Rewrite resume bullet points to be more impactful and action-oriented.
        If a job description is provided, tailor the rewrite to align with the JD keywords.
        """
        if not self.model:
            return [f"[Mock] Optimized: {b}" for b in bullets]
            
        combined_bullets = "\n".join([f"- {b}" for b in bullets])
        
        prompt = f"""
        You are an expert Resume Writer and Career Coach. 
        Please rewrite the following resume bullet points to make them highly impactful, quantifiable, and action-oriented (following the XYZ formula: Accomplished [X] as measured by [Y], by doing [Z]).
        
        Original Bullet Points:
        {combined_bullets}
        """
        
        if job_description:
            prompt += f"\n\nTailor the rewritten bullet points specifically to match this Job Description context where applicable:\n{job_description}"
            
        prompt += "\n\nProvide ONLY the rewritten bullet points as a simple text list with a dash (-) prefix for each."
        
        try:
            response = self.model.generate_content(prompt)
            rewritten_text = response.text
            # Parse the response back into a list
            lines = [line.strip().lstrip('-').strip() for line in rewritten_text.split('\n') if line.strip()]
            return lines
        except Exception as e:
            print(f"Error calling Gemini API: {e}")
            return bullets # Fallback to original

    def generate_summary(self, skills: List[str], role: str, experience_level: str) -> str:
        """
        Generate a professional resume summary based on provided inputs.
        """
        if not self.model:
            return f"[Mock] Highly motivated {role} with expertise in {', '.join(skills[:3])}."
            
        prompt = f"""
        Write a concise, professional 3-sentence resume summary for a {role} at the {experience_level} level.
        Key skills to highlight: {', '.join(skills)}.
        Make it sound compelling and ready for an ATS system.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            print(f"Error calling Gemini API: {e}")
            return f"Experienced professional with expertise in {', '.join(skills)}."
