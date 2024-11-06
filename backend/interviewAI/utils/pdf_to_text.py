import fitz


def load_resume_from_pdf(pdf_file_path):
    doc = fitz.open(pdf_file_path)
    resume_text = ""

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        resume_text += page.get_text()

    doc.close()
    return resume_text.strip()
