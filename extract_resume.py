from docx import Document
import pathlib

path = pathlib.Path(r'C:\Users\hp\Downloads\Urwa_Imtiaz_Resume_v6.docx')
if not path.exists():
    raise FileNotFoundError(path)

doc = Document(path)
for i, p in enumerate(doc.paragraphs):
    text = p.text.strip()
    if text:
        print(f'{i}: {text}')
