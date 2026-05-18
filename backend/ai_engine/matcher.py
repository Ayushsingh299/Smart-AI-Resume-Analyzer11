import os
import faiss
import numpy as np
from typing import List, Dict, Any
# Mock import for SentenceTransformers or Langchain Embeddings
# from langchain.embeddings import GoogleGenerativeAIEmbeddings

class SemanticMatcher:
    def __init__(self):
        # We would initialize the Embedding model here.
        # e.g., self.embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        self.dimension = 768 # Default dimension for many modern embedding models
        # Initialize a flat L2 FAISS index for vector similarity search
        self.index = faiss.IndexFlatL2(self.dimension)
        self.document_store = [] # Maps index IDs to document text

    def get_embedding(self, text: str) -> np.ndarray:
        """
        Generate embedding for text.
        Mocked to return random vectors for now, to be replaced by actual API call.
        """
        # return self.embeddings.embed_query(text)
        np.random.seed(len(text)) # deterministic for demo
        return np.random.rand(self.dimension).astype('float32')

    def add_to_index(self, documents: List[str]):
        """
        Embed documents and add them to the FAISS index.
        """
        if not documents:
            return
            
        vectors = []
        for doc in documents:
            vectors.append(self.get_embedding(doc))
            self.document_store.append(doc)
            
        vector_np = np.array(vectors)
        self.index.add(vector_np)
        
    def search(self, query: str, k: int = 3) -> List[Dict[str, Any]]:
        """
        Search for top-k most semantically similar documents to the query.
        """
        if self.index.ntotal == 0:
            return []
            
        query_vector = self.get_embedding(query)
        query_vector_np = np.array([query_vector])
        
        distances, indices = self.index.search(query_vector_np, k)
        
        results = []
        for i in range(len(indices[0])):
            idx = indices[0][i]
            if idx != -1 and idx < len(self.document_store):
                results.append({
                    "text": self.document_store[idx],
                    "score": float(1.0 / (1.0 + distances[0][i])) # Convert L2 distance to a 0-1 similarity score
                })
        return results

    def calculate_resume_match(self, resume_text: str, job_description: str) -> float:
        """
        Calculate overall match score between a resume and job description using semantic similarity.
        """
        resume_vec = self.get_embedding(resume_text)
        jd_vec = self.get_embedding(job_description)
        
        # Calculate cosine similarity (mocked using L2 distance for now)
        distance = np.linalg.norm(resume_vec - jd_vec)
        score = 1.0 / (1.0 + distance)
        
        # Normalize and scale to a percentage
        return min(max(score * 100 * 1.5, 0), 100) # 1.5 multiplier as a mock calibration
