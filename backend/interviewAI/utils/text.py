import re


def extract_score(text):
    # Regular expression pattern to match scores like 85/100, 85 out of 100, etc.
    pattern = r'(\d{1,3})\s*(?:/|out of|points out of)\s*100'

    match = re.search(pattern, text, re.IGNORECASE)
    if match:
        return int(match.group(1))  # Extract the score (85 in this case)
    return None
