from __future__ import annotations

import json
import re
import xml.etree.ElementTree as ET
from collections import defaultdict
from pathlib import Path
from zipfile import ZipFile

SOURCE_DIR = Path(r"D:\EdgeDownload")
OUTPUT = Path(r"C:\Users\89836\Documents\Obsidian Vault\.codex-work\service-data.json")
NAMESPACE = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}

MONTH_ORDER = {f"{month}月.xls": month for month in range(1, 8)}


def cell_value(cell: ET.Element, shared_strings: list[str]) -> str:
    cell_type = cell.attrib.get("t")
    if cell_type == "inlineStr":
        return "".join(text.text or "" for text in cell.findall(".//m:t", NAMESPACE)).strip()
    value = cell.find("m:v", NAMESPACE)
    result = "" if value is None else (value.text or "")
    if cell_type == "s" and result:
        return shared_strings[int(result)].strip()
    return result.strip()


def extract_file(path: Path) -> list[dict[str, str]]:
    with ZipFile(path) as archive:
        shared_strings: list[str] = []
        if "xl/sharedStrings.xml" in archive.namelist():
            root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
            shared_strings = [
                "".join(text.text or "" for text in item.findall(".//m:t", NAMESPACE))
                for item in root.findall("m:si", NAMESPACE)
            ]
        sheet = ET.fromstring(archive.read("xl/worksheets/sheet1.xml"))
        result: list[dict[str, str]] = []
        for row in sheet.findall(".//m:sheetData/m:row", NAMESPACE):
            source_row = int(row.attrib.get("r", "0"))
            if source_row < 3:
                continue
            values = {
                re.sub(r"\d+$", "", cell.attrib["r"]): cell_value(cell, shared_strings)
                for cell in row.findall("m:c", NAMESPACE)
            }
            if not values.get("B"):
                continue
            result.append({"source_row": str(source_row), **values})
        return result


def main() -> None:
    column_map = {
        "A": "原始序号",
        "B": "企业名称",
        "C": "所属项目",
        "D": "所属片区",
        "E": "办公地址（详细）",
        "F": "企业类型",
        "G": "受访人",
        "H": "职务",
        "I": "联系方式",
        "J": "走访人员",
        "K": "走访时间",
        "L": "走访方式",
        "M": "服务类型",
        "N": "需求简述",
        "O": "进展",
        "P": "解决方案",
        "Q": "走访纪要",
        "R": "备注",
    }
    records: list[dict[str, str]] = []
    for filename, month_number in MONTH_ORDER.items():
        path = SOURCE_DIR / filename
        for row in extract_file(path):
            service_type = row.get("M", "") or "未分类（台账未填写）"
            record = {
                "来源月份": f"{month_number}月",
                "月份序号": str(month_number),
                **{label: row.get(letter, "") for letter, label in column_map.items()},
                "服务类型": service_type,
                "来源文件": filename,
                "来源行号": row["source_row"],
            }
            records.append(record)

    # 仅标记完全相同的业务记录，保留所有原始行，便于追溯。
    seen: defaultdict[tuple[str, ...], int] = defaultdict(int)
    for record in records:
        signature = tuple(
            record[key]
            for key in ("企业名称", "走访时间", "服务类型", "需求简述", "进展", "解决方案", "走访纪要")
        )
        seen[signature] += 1
        record["重复标记"] = "非重复" if seen[signature] == 1 else "重复"

    records.sort(
        key=lambda item: (
            item["服务类型"],
            item["月份序号"],
            item["走访时间"],
            item["企业名称"],
            int(item["来源行号"]),
        )
    )
    service_types = sorted({record["服务类型"] for record in records})
    OUTPUT.write_text(
        json.dumps({"records": records, "service_types": service_types}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"records={len(records)}, service_types={len(service_types)}")


if __name__ == "__main__":
    main()
