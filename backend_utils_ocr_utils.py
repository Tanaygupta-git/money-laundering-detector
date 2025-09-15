import pytesseract
from pdf2image import convert_from_path
from PIL import Image

def extract_text_from_pdf(pdf_path):
    images = convert_from_path(pdf_path, 500)
    text = ""
    for img in images:
        text += pytesseract.image_to_string(img)
    return text

def extract_text_from_image(image_path):
    img = Image.open(image_path)
    text = pytesseract.image_to_string(img)
    return text