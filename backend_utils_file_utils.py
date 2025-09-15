import re

def allowed_file(ext):
    return ext in [".pdf", ".jpg", ".jpeg", ".png", ".csv", ".xlsx"]

def secure_filename(filename):
    return re.sub(r'[^a-zA-Z0-9_.-]', '_', filename)