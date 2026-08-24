"""Generate DOCX lesson plans for all RAZ Level L books."""
from __future__ import annotations

import importlib
import os
import sys
import traceback

WORK_DIR = r"C:\Users\89836\Documents\Obsidian Vault\📁 项目\副业\RAZ\.work"
OUT_DIR = r"C:\Users\89836\Documents\Obsidian Vault\📁 项目\副业\RAZ\Level L\教案"
os.makedirs(OUT_DIR, exist_ok=True)

sys.path.insert(0, WORK_DIR)

from render_lesson import render_lesson

ALL_LESSONS = []
for n in range(1, 13):
    mod = importlib.import_module(f"lessons_part{n}")
    ALL_LESSONS.extend(mod.LESSONS)

print(f"Loaded {len(ALL_LESSONS)} lessons.")

failed = []
succeeded = []
for lesson in ALL_LESSONS:
    title = lesson["title_en"]
    out_path = os.path.join(OUT_DIR, f"{title}—教案.docx")
    try:
        render_lesson(lesson, out_path)
        succeeded.append((title, out_path))
        print(f"  OK  {title}")
    except Exception as exc:
        failed.append((title, str(exc), traceback.format_exc()))
        print(f"  FAIL {title}: {exc}")

print()
print(f"Total: {len(ALL_LESSONS)}, OK: {len(succeeded)}, FAIL: {len(failed)}")
for title, msg, tb in failed:
    print(f"--- {title} ---")
    print(msg)
