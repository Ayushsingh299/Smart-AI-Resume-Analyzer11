import io
from typing import Dict, Any
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

class ProfessionalResumeGenerator:
    """
    Generates an ATS-friendly, highly professional PDF resume 
    using ReportLab. Designed to mimic premium resume builders.
    """
    
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()

    def _setup_custom_styles(self):
        # Professional Fonts (Fallback to standard Helvetica if TTF not available)
        # Note: In a production app, you would load custom fonts like Inter or Roboto here.
        
        self.styles.add(ParagraphStyle(
            name='ResumeName',
            parent=self.styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=24,
            spaceAfter=6,
            textColor=colors.HexColor('#1a1a1a')
        ))
        
        self.styles.add(ParagraphStyle(
            name='ContactInfo',
            parent=self.styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            textColor=colors.HexColor('#4a4a4a'),
            spaceAfter=12
        ))
        
        self.styles.add(ParagraphStyle(
            name='SectionHeader',
            parent=self.styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=14,
            textColor=colors.HexColor('#2c3e50'),
            spaceBefore=16,
            spaceAfter=8,
            borderPadding=4,
        ))

        self.styles.add(ParagraphStyle(
            name='JobTitle',
            parent=self.styles['Heading3'],
            fontName='Helvetica-Bold',
            fontSize=12,
            textColor=colors.HexColor('#1a1a1a'),
            spaceAfter=2
        ))

        self.styles.add(ParagraphStyle(
            name='JobMeta',
            parent=self.styles['Normal'],
            fontName='Helvetica-Oblique',
            fontSize=10,
            textColor=colors.HexColor('#666666'),
            spaceAfter=6
        ))

        self.styles.add(ParagraphStyle(
            name='Bullet',
            parent=self.styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            leftIndent=15,
            firstLineIndent=-10,
            spaceAfter=4,
            leading=14
        ))

    def generate_pdf(self, resume_data: Dict[str, Any]) -> bytes:
        """
        Generates a PDF buffer from structured resume data.
        resume_data should contain: personal_info, summary, experience, education, skills
        """
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer, 
            pagesize=letter,
            rightMargin=0.75*inch, leftMargin=0.75*inch,
            topMargin=0.75*inch, bottomMargin=0.75*inch
        )
        
        story = []

        # 1. Header (Name and Contact)
        personal = resume_data.get('personal_info', {})
        story.append(Paragraph(personal.get('full_name', 'Your Name'), self.styles['ResumeName']))
        
        contact_str = f"{personal.get('email', '')} | {personal.get('phone', '')} | {personal.get('location', '')}"
        if personal.get('linkedin'):
            contact_str += f" | {personal.get('linkedin')}"
        story.append(Paragraph(contact_str, self.styles['ContactInfo']))
        
        # Add a subtle line separator
        story.append(Spacer(1, 4))
        
        # 2. Professional Summary
        summary = resume_data.get('summary', '')
        if summary:
            story.append(Paragraph("PROFESSIONAL SUMMARY", self.styles['SectionHeader']))
            story.append(Paragraph(summary, self.styles['Normal']))

        # 3. Experience Section
        experiences = resume_data.get('experiences', [])
        if experiences:
            story.append(Paragraph("WORK EXPERIENCE", self.styles['SectionHeader']))
            
            for exp in experiences:
                # Title and Company
                story.append(Paragraph(f"{exp.get('position', '')} at {exp.get('company', '')}", self.styles['JobTitle']))
                # Date and Location
                date_str = f"{exp.get('start_date', '')} - {exp.get('end_date', 'Present')}"
                story.append(Paragraph(date_str, self.styles['JobMeta']))
                
                # Bullet points
                for bullet in exp.get('responsibilities', []):
                    # Using standard bullet character
                    story.append(Paragraph(f"• {bullet}", self.styles['Bullet']))
                
                story.append(Spacer(1, 8))

        # 4. Education Section
        education = resume_data.get('education', [])
        if education:
            story.append(Paragraph("EDUCATION", self.styles['SectionHeader']))
            
            for edu in education:
                story.append(Paragraph(f"{edu.get('degree', '')} in {edu.get('field', '')}", self.styles['JobTitle']))
                edu_meta = f"{edu.get('school', '')} | {edu.get('graduation_date', '')}"
                if edu.get('gpa'):
                    edu_meta += f" | GPA: {edu.get('gpa')}"
                story.append(Paragraph(edu_meta, self.styles['JobMeta']))
                story.append(Spacer(1, 6))

        # 5. Skills Section
        skills_dict = resume_data.get('skills_categories', {})
        if any(skills_dict.values()):
            story.append(Paragraph("TECHNICAL SKILLS", self.styles['SectionHeader']))
            
            # Formatting skills as a simple table or aligned text
            for category, skills_list in skills_dict.items():
                if skills_list:
                    cat_name = category.replace('_', ' ').title()
                    skills_str = ", ".join(skills_list)
                    story.append(Paragraph(f"<b>{cat_name}:</b> {skills_str}", self.styles['Normal']))
                    story.append(Spacer(1, 4))

        # Build the PDF
        doc.build(story)
        
        pdf_bytes = buffer.getvalue()
        buffer.close()
        return pdf_bytes
