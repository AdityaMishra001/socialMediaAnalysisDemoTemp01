from __future__ import annotations
import csv
import io
from typing import List

class FileParseError(Exception):
    pass

def parse_txt_content(text: str) -> List[str]:
    """Parse raw plain text into discrete feedback items."""
    if not text or not text.strip():
        return []
    
    # Check if text contains double newlines (paragraphs)
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
    if len(paragraphs) > 1:
        return paragraphs
    
    # Otherwise split by line
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    return lines

def parse_csv_bytes(file_bytes: bytes, filename: str = "upload.csv") -> List[str]:
    """Parse CSV bytes, auto-detecting delimiter and target feedback column."""
    if not file_bytes:
        raise FileParseError("The uploaded CSV file is empty.")

    # Try utf-8 then latin-1
    try:
        decoded = file_bytes.decode("utf-8")
    except UnicodeDecodeError:
        try:
            decoded = file_bytes.decode("latin-1")
        except Exception as e:
            raise FileParseError(f"Unable to read file encoding: {str(e)}")

    if not decoded.strip():
        raise FileParseError("The CSV file has no content.")

    # Auto detect delimiter
    sample = decoded[:4096]
    delimiter = ","
    try:
        dialect = csv.Sniffer().sniff(sample)
        delimiter = dialect.delimiter
    except Exception:
        delimiter = ","

    f = io.StringIO(decoded)
    reader = csv.reader(f, delimiter=delimiter)
    
    rows = [r for r in reader if r]
    if not rows:
        raise FileParseError("The CSV file does not contain any rows.")

    header = rows[0]
    data_rows = rows[1:] if len(rows) > 1 else rows

    if not data_rows:
        raise FileParseError("The CSV file only contains a header row with no feedback data.")

    # Target column names prioritized
    target_names = [
        "feedback", "comment", "review", "text", "response", "message",
        "description", "body", "content", "opinion", "remarks", "note"
    ]
    
    selected_col_idx = -1

    # Check header matches
    for idx, col in enumerate(header):
        cleaned_col = col.strip().lower()
        for target in target_names:
            if target in cleaned_col:
                selected_col_idx = idx
                break
        if selected_col_idx != -1:
            break

    # If no header match, inspect column with largest average text length
    if selected_col_idx == -1:
        num_cols = len(header)
        col_lengths = [0] * num_cols
        col_counts = [0] * num_cols

        for row in data_rows:
            for i in range(min(len(row), num_cols)):
                val = row[i].strip()
                if val:
                    col_lengths[i] += len(val)
                    col_counts[i] += 1

        avg_lengths = [
            (col_lengths[i] / col_counts[i]) if col_counts[i] > 0 else 0
            for i in range(num_cols)
        ]
        if avg_lengths:
            selected_col_idx = avg_lengths.index(max(avg_lengths))

    if selected_col_idx == -1:
        selected_col_idx = 0

    feedback_items: List[str] = []
    # If there was a header and more than 1 row, use data_rows, otherwise use rows
    rows_to_use = data_rows if len(rows) > 1 else rows
    for row in rows_to_use:
        if len(row) > selected_col_idx:
            item = row[selected_col_idx].strip()
            # Filter out header name if it leaked
            if item and item.lower() not in target_names:
                feedback_items.append(item)

    if not feedback_items:
        raise FileParseError("Could not extract any valid text feedback from the CSV file.")

    return feedback_items
