"""为 89单集笔记 下的所有 .md 文件补充 extraction_status 字段"""
import os
import re
from pathlib import Path

NOTES_DIR = Path(r"E:\KnowledgeBase\C-外脑-播客知识库\89单集笔记")

def add_extraction_status(filepath: Path) -> bool:
    """检查并补充 extraction_status 和 extracted_at 字段。返回是否修改。"""
    content = filepath.read_text(encoding="utf-8")

    # 找 YAML frontmatter 边界
    if not content.startswith("---"):
        return False

    first_dash = content.index("---", 0)
    second_dash = content.index("---", first_dash + 3)

    frontmatter = content[first_dash:second_dash + 3]

    # 检查是否已有 extraction_status
    if "extraction_status" in frontmatter:
        return False

    # 在第二个 --- 之前插入
    insert = "extraction_status: pending\nextracted_at:\n"
    new_content = content[:second_dash] + insert + content[second_dash:]

    filepath.write_text(new_content, encoding="utf-8")
    return True

def main():
    total = 0
    updated = 0
    for filepath in NOTES_DIR.rglob("*.md"):
        total += 1
        try:
            if add_extraction_status(filepath):
                updated += 1
        except Exception as e:
            print(f"  出错: {filepath.name} — {e}")

    print(f"扫描: {total} 个文件, 修改: {updated} 个文件")

if __name__ == "__main__":
    main()
