import re
from typing import Dict, Any, List

class ATSScorer:
    """
    An advanced, realistic Applicant Tracking System (ATS) scoring engine.
    Real ATS systems focus on parsability, keyword density, section recognition, 
    and quantifiable impact rather than just AI semantic meaning.
    """
    
    def __init__(self):
        # Standard ATS section headers
        self.standard_headers = [
            "experience", "work history", "employment",
            "education", "academic background",
            "skills", "core competencies", "technologies",
            "projects", "summary", "profile", "objective"
        ]
        
        # Action verbs for impact analysis
        self.action_verbs = [
            "achieved", "improved", "trained", "managed", "created", 
            "developed", "resolved", "increased", "decreased", "launched",
            "spearheaded", "orchestrated", "engineered", "designed"
        ]

    def analyze_resume(self, resume_text: str, job_description: str) -> Dict[str, Any]:
        """
        Perform a comprehensive ATS analysis returning a detailed scorecard.
        """
        resume_lower = resume_text.lower()
        jd_lower = job_description.lower()
        
        # 1. Parsing & Structure Score (Are standard sections found?)
        found_sections = [h for h in self.standard_headers if h in resume_lower]
        has_experience = any(h in resume_lower for h in ["experience", "work history", "employment"])
        has_education = any(h in resume_lower for h in ["education", "academic"])
        has_skills = any(h in resume_lower for h in ["skills", "technologies"])
        
        structure_score = 0
        if has_experience: structure_score += 40
        if has_education: structure_score += 30
        if has_skills: structure_score += 30
            
        # 2. Keyword Match Density (Exact and slight variations)
        # Extract potential keywords from JD (words > 4 chars, ignoring common stop words loosely)
        jd_words = set(re.findall(r'\b[a-z]{5,}\b', jd_lower))
        resume_words = set(re.findall(r'\b[a-z]{5,}\b', resume_lower))
        
        matched_keywords = jd_words.intersection(resume_words)
        missing_keywords = jd_words.difference(resume_words)
        
        keyword_score = 0
        if len(jd_words) > 0:
            match_ratio = len(matched_keywords) / len(jd_words)
            # ATS systems usually consider > 60% keyword match as excellent
            keyword_score = min(100, int((match_ratio / 0.6) * 100))
            
        # 3. Impact & Quantifiability (Are there numbers and action verbs?)
        # Find numbers, percentages, or dollar amounts
        numbers_found = len(re.findall(r'\b\d+\b|%|\$', resume_text))
        action_verbs_found = len([v for v in self.action_verbs if v in resume_lower])
        
        impact_score = min(100, (numbers_found * 10) + (action_verbs_found * 5))
        
        # 4. Word Count & Readability (Sweet spot: 400 - 800 words)
        word_count = len(resume_text.split())
        if 400 <= word_count <= 800:
            readability_score = 100
        elif 300 <= word_count < 400 or 800 < word_count <= 1000:
            readability_score = 75
        else:
            readability_score = 40 # Too short or too long
            
        # Calculate Final Weighted ATS Score
        # Keywords (40%), Structure (25%), Impact (25%), Readability (10%)
        final_score = int(
            (keyword_score * 0.40) + 
            (structure_score * 0.25) + 
            (impact_score * 0.25) + 
            (readability_score * 0.10)
        )
        
        return {
            "overall_ats_score": final_score,
            "breakdown": {
                "keyword_match_score": keyword_score,
                "structure_formatting_score": structure_score,
                "impact_quantifiability_score": impact_score,
                "readability_length_score": readability_score
            },
            "insights": {
                "word_count": word_count,
                "quantifiable_metrics_found": numbers_found,
                "action_verbs_found": action_verbs_found,
                "matched_keywords": list(matched_keywords)[:10], # Top 10
                "missing_critical_keywords": list(missing_keywords)[:10]
            },
            "recommendations": self._generate_recommendations(
                structure_score, keyword_score, impact_score, readability_score
            )
        }

    def _generate_recommendations(self, structure: int, keywords: int, impact: int, readability: int) -> List[str]:
        recs = []
        if structure < 100:
            recs.append("Ensure your resume uses standard section headers like 'Experience', 'Education', and 'Skills' so the ATS can parse it correctly.")
        if keywords < 70:
            recs.append("Your keyword match is low. Naturally integrate more hard skills and terms directly from the Job Description.")
        if impact < 70:
            recs.append("Recruiters and ATS look for numbers. Add quantifiable metrics (percentages, dollar amounts) and start bullets with strong action verbs.")
        if readability < 70:
            recs.append("Your resume length is outside the optimal range. Aim for 400-800 words to ensure it's concise yet detailed enough.")
            
        if not recs:
            recs.append("Your resume is highly optimized for ATS systems. Great job!")
            
        return recs
