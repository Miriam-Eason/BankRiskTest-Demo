from __future__ import annotations

import json
from pathlib import Path
from typing import Dict, List
from zipfile import ZipFile
from xml.etree import ElementTree as ET

NS = {"a": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}

SOURCE_FILE = Path("personal_data.xlsx")
OUTPUT_FILE = Path("src/data/data.json")

FIELD_MAP = {
    "用户": "用户",
    "身份证号": "身份证号",
    "性别": "性别",
    "姓名": "姓名",
    "出生年份": "出生年份",
    "学历": "学历",
    "年收入（万元）": "年收入",
    "工作领域": "工作领域",
    "工作机构": "工作机构",
    "账户状态": "账户状态",
    "账户金额": "账户金额",
}

INT_FIELDS = {"出生年份", "账户金额"}
FLOAT_FIELDS = {"年收入"}


def load_shared_strings(workbook: ZipFile) -> List[str]:
    if "xl/sharedStrings.xml" not in workbook.namelist():
        return []

    root = ET.fromstring(workbook.read("xl/sharedStrings.xml"))
    strings: List[str] = []
    for item in root.findall("a:si", NS):
        text = "".join(node.text or "" for node in item.iterfind(".//a:t", NS))
        strings.append(text)
    return strings


def column_index(cell_ref: str) -> int:
    letters = "".join(char for char in cell_ref if char.isalpha())
    index = 0
    for char in letters:
        index = index * 26 + ord(char.upper()) - ord("A") + 1
    return index - 1


def read_cell_value(cell: ET.Element, shared_strings: List[str]) -> str:
    value = cell.find("a:v", NS)
    if value is None or value.text is None:
        return ""

    raw = value.text
    if cell.get("t") == "s":
        return shared_strings[int(raw)]
    return raw


def normalize_number(raw: str, field_name: str):
    if field_name in INT_FIELDS:
        return int(float(raw))
    if field_name in FLOAT_FIELDS:
        return float(raw)
    return raw


def read_rows(source_file: Path) -> List[Dict[str, object]]:
    with ZipFile(source_file) as workbook:
        shared_strings = load_shared_strings(workbook)
        sheet = ET.fromstring(workbook.read("xl/worksheets/sheet1.xml"))

    sheet_data = sheet.find("a:sheetData", NS)
    if sheet_data is None:
        raise ValueError("Excel 中未找到工作表数据")

    rows = sheet_data.findall("a:row", NS)
    if not rows:
        return []

    headers: List[str] = []
    result: List[Dict[str, object]] = []

    for row_index, row in enumerate(rows):
        cells = row.findall("a:c", NS)
        values: List[str] = []
        for cell in cells:
            idx = column_index(cell.get("r", "A1"))
            while len(values) <= idx:
                values.append("")
            values[idx] = read_cell_value(cell, shared_strings)

        if row_index == 0:
            headers = values
            continue

        if not any(values):
            continue

        record: Dict[str, object] = {}
        for header, value in zip(headers, values):
            if header not in FIELD_MAP:
                continue
            output_field = FIELD_MAP[header]
            record[output_field] = normalize_number(value, output_field) if value != "" else ""
        result.append(record)

    return result


def main() -> None:
    data = read_rows(SOURCE_FILE)
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Converted {len(data)} rows to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
