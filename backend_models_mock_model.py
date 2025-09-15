import random

def predict_money_laundering(text: str):
    """
    Mock prediction function. Replace with real ML model.
    """
    suspicious_keywords = ["offshore", "shell", "layering", "structuring", "hawala", "round-trip"]
    if any(word in text.lower() for word in suspicious_keywords):
        return "Suspicious", round(random.uniform(0.8, 0.98), 2)
    return "Safe", round(random.uniform(0.7, 0.95), 2)