$ErrorActionPreference = 'Stop'

$vault = 'C:\Users\89836\Documents\Obsidian Vault'
$docx = (Get-ChildItem -LiteralPath $vault -Filter '*2026-07-15.docx' -File -Recurse | Where-Object { $_.Name -like '*2026-07-15.docx' } | Select-Object -First 1).FullName
$outDir = Join-Path $vault '99_*\*\weineng_docx_render'
$outDir = (Get-Item -Path $outDir).FullName
$pdf = Join-Path $outDir 'weineng-article-editing-pack-2026-07-15.pdf'
if (-not $docx) { throw 'DOCX input was not found.' }

$app = $null
$document = $null
try {
    foreach ($progId in @('KWPS.Application', 'KET.Application', 'Word.Application')) {
        try {
            $app = New-Object -ComObject $progId
            if ($app) { break }
        } catch {
            $app = $null
        }
    }
    if (-not $app) { throw 'No compatible WPS/Word COM application found.' }
    $app.Visible = $false
    $document = $app.Documents.Open($docx, $false, $true)
    $document.ExportAsFixedFormat($pdf, 17)
    Write-Output $pdf
} finally {
    if ($document) { $document.Close($false) }
    if ($app) { $app.Quit() }
    if ($document) { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($document) }
    if ($app) { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($app) }
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
}
