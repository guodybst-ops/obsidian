import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const workDir = "C:/Users/89836/Documents/Obsidian Vault/.codex-work";
const outputPath = "C:/Users/89836/Documents/Obsidian Vault/outputs/企业走访服务类型分类_1-7月.xlsx";
const data = JSON.parse(await fs.readFile(`${workDir}/service-data.json`, "utf8"));
const records = data.records;
const serviceTypes = data.service_types;
const detailStartRow = 4;
const detailEndRow = detailStartRow + records.length - 1;
const summaryStartRow = 5;
const summaryEndRow = summaryStartRow + serviceTypes.length - 1;
const totalRow = summaryEndRow + 1;

const workbook = Workbook.create();
const summary = workbook.worksheets.add("服务类型汇总");
const detail = workbook.worksheets.add("分类明细");
const notes = workbook.worksheets.add("口径说明");

const titleFormat = {
  fill: "#1F4E78",
  font: { bold: true, color: "#FFFFFF", size: 16 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
};
const subtitleFormat = {
  fill: "#D9EAF7",
  font: { color: "#1F1F1F", italic: true },
  verticalAlignment: "center",
  wrapText: true,
};
const headerFormat = {
  fill: "#5B9BD5",
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
  borders: { preset: "all", style: "thin", color: "#B4C7E7" },
};
const lightBorder = { preset: "all", style: "thin", color: "#D9E2F3" };

function styleTitle(sheet, range, title, subtitle) {
  sheet.getRange(range).merge();
  sheet.getRange(range.split(":")[0]).values = [[title]];
  sheet.getRange(range).format = titleFormat;
  sheet.getRange(range.split(":")[0]).format.rowHeight = 30;
  const subtitleRange = range.replace(/[0-9]+/g, "2");
  sheet.getRange(subtitleRange).merge();
  sheet.getRange(subtitleRange.split(":")[0]).values = [[subtitle]];
  sheet.getRange(subtitleRange).format = subtitleFormat;
  sheet.getRange(subtitleRange.split(":")[0]).format.rowHeight = 30;
}

// 汇总表
summary.showGridLines = false;
styleTitle(
  summary,
  "A1:I1",
  "企业走访服务类型汇总（1—7月）",
  "汇总保留全部原始记录；“去重后记录数”仅识别完全相同的企业、走访时间、服务类型、需求、进展、解决方案和走访纪要。",
);
summary.getRange("A4:I4").values = [[
  "服务类型",
  "原始记录数",
  "去重后记录数",
  "已解决",
  "跟进中",
  "未跟进",
  "已关闭",
  "其他/空白",
  "已解决率",
]];
summary.getRange("A4:I4").format = headerFormat;
summary.getRange(`A${summaryStartRow}:A${summaryEndRow}`).values = serviceTypes.map((type) => [type]);
for (let row = summaryStartRow; row <= summaryEndRow; row += 1) {
  summary.getRange(`B${row}:I${row}`).formulas = [[
    `=COUNTIF('分类明细'!$B$${detailStartRow}:$B$${detailEndRow},A${row})`,
    `=COUNTIFS('分类明细'!$B$${detailStartRow}:$B$${detailEndRow},A${row},'分类明细'!$S$${detailStartRow}:$S$${detailEndRow},"非重复")`,
    `=COUNTIFS('分类明细'!$B$${detailStartRow}:$B$${detailEndRow},A${row},'分类明细'!$O$${detailStartRow}:$O$${detailEndRow},"已解决")`,
    `=COUNTIFS('分类明细'!$B$${detailStartRow}:$B$${detailEndRow},A${row},'分类明细'!$O$${detailStartRow}:$O$${detailEndRow},"跟进中")`,
    `=COUNTIFS('分类明细'!$B$${detailStartRow}:$B$${detailEndRow},A${row},'分类明细'!$O$${detailStartRow}:$O$${detailEndRow},"未跟进")`,
    `=COUNTIFS('分类明细'!$B$${detailStartRow}:$B$${detailEndRow},A${row},'分类明细'!$O$${detailStartRow}:$O$${detailEndRow},"已关闭")`,
    `=B${row}-SUM(D${row}:G${row})`,
    `=IFERROR(D${row}/B${row},0)`,
  ]];
}
summary.getRange(`A${totalRow}:I${totalRow}`).values = [["合计", null, null, null, null, null, null, null, null]];
summary.getRange(`B${totalRow}:I${totalRow}`).formulas = [[
  `=SUM(B${summaryStartRow}:B${summaryEndRow})`,
  `=SUM(C${summaryStartRow}:C${summaryEndRow})`,
  `=SUM(D${summaryStartRow}:D${summaryEndRow})`,
  `=SUM(E${summaryStartRow}:E${summaryEndRow})`,
  `=SUM(F${summaryStartRow}:F${summaryEndRow})`,
  `=SUM(G${summaryStartRow}:G${summaryEndRow})`,
  `=SUM(H${summaryStartRow}:H${summaryEndRow})`,
  `=IFERROR(D${totalRow}/B${totalRow},0)`,
]];
summary.getRange(`A${summaryStartRow}:I${totalRow}`).format.borders = lightBorder;
summary.getRange(`A${totalRow}:I${totalRow}`).format = {
  fill: "#D9EAD3",
  font: { bold: true, color: "#274E13" },
  borders: { preset: "all", style: "thin", color: "#93C47D" },
};
summary.getRange(`B${summaryStartRow}:H${totalRow}`).format.numberFormat = "#,##0";
summary.getRange(`I${summaryStartRow}:I${totalRow}`).format.numberFormat = "0.0%";
summary.getRange(`A${summaryStartRow}:A${summaryEndRow}`).format.wrapText = true;
summary.getRange(`B${summaryStartRow}:I${totalRow}`).format.horizontalAlignment = "center";
summary.getRange(`A4:I${summaryEndRow}`).format.rowHeight = 22;
summary.getRange(`A${summaryStartRow}:A${summaryEndRow}`).format.rowHeight = 30;
summary.getRange("A:A").format.columnWidth = 28;
summary.getRange("B:H").format.columnWidth = 13;
summary.getRange("I:I").format.columnWidth = 12;
summary.freezePanes.freezeRows(4);
summary.tables.add(`A4:I${summaryEndRow}`, true, "ServiceTypeSummary");
summary.getRange(`B${summaryStartRow}:B${summaryEndRow}`).conditionalFormats.add("dataBar", { color: "#5B9BD5", gradient: true });

// 分类明细：保留全部原始数据并按服务类型排序。
detail.showGridLines = false;
styleTitle(
  detail,
  "A1:U1",
  "企业走访分类明细（按服务类型排序）",
  `共 ${records.length} 条原始记录；可使用表头筛选服务类型、企业、月份和进展。重复标记仅用于识别重复录入，不删除任何原始行。`,
);
const detailHeaders = [
  "来源月份", "服务类型", "企业名称", "所属项目", "所属片区", "办公地址（详细）", "企业类型", "受访人", "职务", "联系方式",
  "走访人员", "走访时间", "走访方式", "需求简述", "进展", "解决方案", "走访纪要", "备注", "重复标记", "原始序号", "来源定位",
];
detail.getRange("A3:U3").values = [detailHeaders];
detail.getRange("A3:U3").format = headerFormat;
const detailRows = records.map((record) => [
  record["来源月份"], record["服务类型"], record["企业名称"], record["所属项目"], record["所属片区"], record["办公地址（详细）"], record["企业类型"], record["受访人"], record["职务"], record["联系方式"],
  record["走访人员"], record["走访时间"], record["走访方式"], record["需求简述"], record["进展"], record["解决方案"], record["走访纪要"], record["备注"], record["重复标记"], record["原始序号"], `${record["来源文件"]} 第${record["来源行号"]}行`,
]);
detail.getRange(`A${detailStartRow}:U${detailEndRow}`).values = detailRows;
detail.getRange(`A${detailStartRow}:U${detailEndRow}`).format = {
  verticalAlignment: "top",
  wrapText: true,
  borders: lightBorder,
};
detail.getRange(`A${detailStartRow}:A${detailEndRow}`).format.horizontalAlignment = "center";
detail.getRange(`O${detailStartRow}:O${detailEndRow}`).format.horizontalAlignment = "center";
detail.getRange(`S${detailStartRow}:T${detailEndRow}`).format.horizontalAlignment = "center";
detail.getRange(`A${detailStartRow}:U${detailEndRow}`).format.rowHeight = 34;
const detailWidths = [10, 24, 28, 18, 16, 22, 30, 14, 12, 16, 18, 22, 12, 48, 12, 46, 42, 20, 12, 10, 20];
for (let index = 0; index < detailWidths.length; index += 1) {
  detail.getRangeByIndexes(0, index, detailEndRow, 1).format.columnWidth = detailWidths[index];
}
detail.freezePanes.freezeRows(3);
detail.freezePanes.freezeColumns(3);
detail.tables.add(`A3:U${detailEndRow}`, true, "ServiceTypeDetail");
detail.getRange(`O${detailStartRow}:O${detailEndRow}`).conditionalFormats.add("containsText", {
  text: "已解决", format: { fill: "#E2F0D9", font: { color: "#375623" } },
});
detail.getRange(`O${detailStartRow}:O${detailEndRow}`).conditionalFormats.add("containsText", {
  text: "跟进中", format: { fill: "#FFF2CC", font: { color: "#7F6000" } },
});
detail.getRange(`O${detailStartRow}:O${detailEndRow}`).conditionalFormats.add("containsText", {
  text: "未跟进", format: { fill: "#FCE4D6", font: { color: "#C00000" } },
});
detail.getRange(`S${detailStartRow}:S${detailEndRow}`).conditionalFormats.add("containsText", {
  text: "重复", format: { fill: "#FCE4D6", font: { color: "#C00000" } },
});

// 口径说明
notes.showGridLines = false;
styleTitle(notes, "A1:D1", "数据口径与使用说明", "本文件保留源台账全量数据，服务类型直接取自原台账“需求分类”字段。未填写该字段的记录归入“未分类（台账未填写）”。");
notes.getRange("A4:B10").values = [
  ["指标", "数值"],
  ["原始记录数", null],
  ["去重后记录数", null],
  ["标记为重复的记录数", null],
  ["服务类型数量", serviceTypes.length],
  ["未分类（台账未填写）记录数", null],
  ["来源文件数", 7],
];
notes.getRange("A4:B4").format = headerFormat;
notes.getRange("A5:B10").format.borders = lightBorder;
notes.getRange("A5:A10").format.fill = "#EAF2F8";
notes.getRange("A5:A10").format.font = { bold: true, color: "#1F1F1F" };
notes.getRange("B5:B10").format.numberFormat = "#,##0";
notes.getRange("B5:B10").format.horizontalAlignment = "center";
notes.getRange("B5").formulas = [[`=COUNTA('分类明细'!$A$${detailStartRow}:$A$${detailEndRow})`]];
notes.getRange("B6").formulas = [[`=COUNTIF('分类明细'!$S$${detailStartRow}:$S$${detailEndRow},"非重复")`]];
notes.getRange("B7").formulas = [[`=COUNTIF('分类明细'!$S$${detailStartRow}:$S$${detailEndRow},"重复")`]];
notes.getRange("B9").formulas = [[`=COUNTIF('分类明细'!$B$${detailStartRow}:$B$${detailEndRow},"未分类（台账未填写）")`]];
notes.getRange("A13:D13").merge();
notes.getRange("A13").values = [["使用说明"]];
notes.getRange("A13:D13").format = { fill: "#5B9BD5", font: { bold: true, color: "#FFFFFF" } };
notes.getRange("A14:D19").merge(true);
notes.getRange("A14").values = [["1. 分类依据：原台账“需求分类”字段，未修改原始分类名称。\n2. 全量明细：分类明细表保留1295条原始记录，按服务类型、月份、走访时间排序，可直接筛选。\n3. 重复识别：相同企业、走访时间、服务类型、需求简述、进展、解决方案和走访纪要的后续记录标为“重复”，并未从明细中删除。\n4. 进展统计：服务类型汇总中“已解决、跟进中、未跟进、已关闭”直接按进展字段统计；其他/空白用于承接剩余状态。\n5. 溯源：分类明细表最后一列记录来源文件和原始行号。"]];
notes.getRange("A14:D19").format = { wrapText: true, verticalAlignment: "top", borders: lightBorder };
notes.getRange("A:A").format.columnWidth = 28;
notes.getRange("B:B").format.columnWidth = 14;
notes.getRange("C:D").format.columnWidth = 25;
notes.getRange("A14").format.rowHeight = 150;

await fs.mkdir("C:/Users/89836/Documents/Obsidian Vault/outputs", { recursive: true });
const exported = await SpreadsheetFile.exportXlsx(workbook);
await exported.save(outputPath);

const summaryPreview = await workbook.render({ sheetName: "服务类型汇总", range: `A1:I${Math.min(totalRow, 22)}`, scale: 1.25, format: "png" });
await fs.writeFile(`${workDir}/summary-preview.png`, new Uint8Array(await summaryPreview.arrayBuffer()));
const detailPreview = await workbook.render({ sheetName: "分类明细", range: "A1:U12", scale: 0.85, format: "png" });
await fs.writeFile(`${workDir}/detail-preview.png`, new Uint8Array(await detailPreview.arrayBuffer()));
const notesPreview = await workbook.render({ sheetName: "口径说明", range: "A1:D19", scale: 1.2, format: "png" });
await fs.writeFile(`${workDir}/notes-preview.png`, new Uint8Array(await notesPreview.arrayBuffer()));

const check = await workbook.inspect({
  kind: "table",
  range: `服务类型汇总!A1:I${totalRow}`,
  include: "values,formulas",
  tableMaxRows: 12,
  tableMaxCols: 9,
});
const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "formula error scan",
});
await fs.writeFile(`${workDir}/verification.txt`, `${check.ndjson}\n${errors.ndjson}`, "utf8");
console.log(JSON.stringify({ outputPath, totalRow, detailEndRow, check: check.ndjson, errors: errors.ndjson }));
