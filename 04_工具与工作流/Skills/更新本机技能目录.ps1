$ErrorActionPreference = 'Continue'
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)

# 生成日常可用 Skill 清单。只读取个人可直接调用目录；不会修改技能原文件。
$catalogRoot = Join-Path $PSScriptRoot '本机技能目录_2026-08-05'
New-Item -ItemType Directory -Force -Path $catalogRoot | Out-Null

# 日常速查不需要覆盖所有已安装能力。以下 20 项已按当前工作场景
# （AI 教育研究、内容生产、知识库与轻量工具）排除；不会删除任何 Skill 原文件。
$excludedSkillNames = @(
    'animejs',
    'contribute-catalog',
    'css-animations',
    'git-guardrails-claude-code',
    'gsap',
    'hatch-pet',
    'lottie',
    'migrate-to-shoehorn',
    'remotion-to-hyperframes',
    'scaffold-exercises',
    'self-improving-agent',
    'setup-matt-pocock-skills',
    'setup-pre-commit',
    'tailwind',
    'tdd',
    'three',
    'to-issues',
    'triage',
    'typegpu',
    'waapi'
)

function Get-Text([string]$value) {
    if ($null -eq $value) { return '' }
    return ([string]$value).Trim().Trim('"').Trim("'")
}

function Escape-MarkdownCell([string]$value) {
    if ($null -eq $value) { return '' }
    return (($value -replace '[\r\n]+', ' ') -replace '\|', '\\|').Trim()
}

function Get-SourceType([string]$path) {
    if ($path -like 'C:\Users\89836\.codex\skills\*' -or $path -like 'C:\Users\89836\.agents\skills\*') { return '个人已安装 / 可直接调用' }
    if ($path -like 'C:\Users\89836\.codex\plugins\cache\*') { return 'Codex 插件缓存' }
    if ($path -like 'C:\Users\89836\Documents\Codex\codex-plugin-marketplaces\*') { return '本地插件市场源码' }
    if ($path -like 'C:\Program Files\WindowsApps\OpenAI.Codex_*') { return 'Codex 应用内置副本' }
    if ($path -like 'C:\Program Files\*') { return '其他应用内置' }
    if ($path -like 'C:\Users\89836\Documents\Obsidian Vault\*') { return '当前知识库项目' }
    return '其他本地文件'
}

function Get-SkillMetadata([string]$path) {
    $lines = Get-Content -LiteralPath $path -TotalCount 100 -Encoding UTF8 -ErrorAction Stop
    $name = ''
    $description = ''
    $inFrontmatter = $false
    $frontmatterEnded = $false
    if ($lines.Count -gt 0 -and $lines[0].Trim() -eq '---') { $inFrontmatter = $true }
    foreach ($line in $lines) {
        if ($inFrontmatter -and $line.Trim() -eq '---' -and $line -ne $lines[0]) { $frontmatterEnded = $true; break }
        if ($inFrontmatter) {
            if (-not $name -and $line -match '^name:\s*(.+)$') { $name = Get-Text $matches[1] }
            if (-not $description -and $line -match '^description:\s*(.+)$') { $description = Get-Text $matches[1] }
        }
    }
    if (-not $name) {
        $heading = $lines | Where-Object { $_ -match '^#\s+' } | Select-Object -First 1
        if ($heading) { $name = ($heading -replace '^#\s+', '').Trim() }
    }
    if (-not $name) { $name = Split-Path (Split-Path $path -Parent) -Leaf }
    if (-not $description) {
        $paragraph = $lines | Where-Object { $_.Trim() -and $_ -notmatch '^(---|#|```|\*|[-\d]+\.)' } | Select-Object -First 1
        $description = Get-Text $paragraph
    }
    $urls = [regex]::Matches(($lines -join "`n"), 'https?://[^\s\)\]"'']+') | ForEach-Object { $_.Value.TrimEnd('.', ',', ';') } | Select-Object -Unique
    [PSCustomObject]@{ Name = $name; Description = $description; ReferenceUrls = @($urls) }
}

# 从相关插件的 manifest 提取明确声明的仓库或主页；不凭技能名称猜测开源地址。
$pluginSources = @()
$manifestRoots = @(
    'C:\Users\89836\.codex\plugins\cache',
    'C:\Users\89836\Documents\Codex\codex-plugin-marketplaces'
)
$manifestPaths = foreach ($root in $manifestRoots) {
    if (Test-Path -LiteralPath $root) {
        & rg --files -g plugin.json --hidden $root 2>$null | Where-Object { $_ -match '\.codex-plugin\\plugin\.json$' }
    }
}
foreach ($manifestPath in $manifestPaths) {
    try {
        $manifest = Get-Content -LiteralPath $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
        $pluginRoot = Split-Path (Split-Path $manifestPath -Parent) -Parent
        $repository = Get-Text $manifest.repository
        $homepage = Get-Text $manifest.homepage
        $sourceUrl = if ($repository) { $repository } else { $homepage }
        $pluginSources += [PSCustomObject]@{ Root = $pluginRoot; Plugin = (Get-Text $manifest.name); Url = $sourceUrl }
    } catch { }
}
$pluginSources = $pluginSources | Sort-Object { $_.Root.Length } -Descending

$skillRoots = @(
    'C:\Users\89836\.codex\skills',
    'C:\Users\89836\.agents\skills'
)
$skillPaths = @(
foreach ($root in $skillRoots) {
    if (Test-Path -LiteralPath $root) {
        & rg --files -g SKILL.md --hidden $root 2>$null
    }
}
) |
    Sort-Object -Unique

$instances = @()
foreach ($path in $skillPaths) {
    try {
        $hash = (Get-FileHash -Algorithm SHA256 -LiteralPath $path -ErrorAction Stop).Hash
        $meta = Get-SkillMetadata $path
        $matchedPlugin = $pluginSources | Where-Object { $path.StartsWith($_.Root, [System.StringComparison]::OrdinalIgnoreCase) } | Select-Object -First 1
        $origin = if ($matchedPlugin -and $matchedPlugin.Url) { $matchedPlugin.Url } else { '' }
        $references = @($meta.ReferenceUrls)
        $instances += [PSCustomObject]@{
            Hash = $hash
            Name = $meta.Name
            Description = $meta.Description
            LocalPath = $path
            SourceType = Get-SourceType $path
            Plugin = if ($matchedPlugin) { $matchedPlugin.Plugin } else { '' }
            SourceUrl = $origin
            ReferenceUrls = ($references -join ' | ')
        }
    } catch { }
}

# 只从知识库统计中排除，不改动原始安装目录或任何 SKILL.md。
$instances = @($instances | Where-Object { $excludedSkillNames -notcontains $_.Name })

$groups = $instances | Group-Object Hash
$catalog = foreach ($group in $groups) {
    $preferred = $group.Group | Sort-Object @{ Expression = { switch ($_.SourceType) {
        '个人已安装 / 可直接调用' { 1 }
        '当前知识库项目' { 2 }
        'Codex 插件缓存' { 3 }
        '本地插件市场源码' { 4 }
        'Codex 应用内置副本' { 5 }
        default { 6 }
    } } }, LocalPath | Select-Object -First 1
    $sourceUrl = ($group.Group | Where-Object SourceUrl | Select-Object -First 1).SourceUrl
    $references = $group.Group.ReferenceUrls | Where-Object { $_ } | ForEach-Object { $_ -split ' \| ' } | Select-Object -Unique
    $types = $group.Group.SourceType | Sort-Object -Unique
    $prompt = "请使用「$($preferred.Name)」技能处理以下任务：$($preferred.Description) 我的具体目标是：[填写]；已知资料/文件是：[填写]；请先指出缺失信息与风险，再给出可执行结果。"
    [PSCustomObject]@{
        Name = $preferred.Name
        Function = $preferred.Description
        Prompt = $prompt
        SourceType = ($types -join '；')
        Plugin = (($group.Group.Plugin | Where-Object { $_ } | Select-Object -Unique) -join '；')
        SourceUrl = $sourceUrl
        ReferenceUrls = ($references -join ' | ')
        PreferredPath = $preferred.LocalPath
        InstanceCount = $group.Count
        InstancePaths = ($group.Group.LocalPath | Sort-Object)
    }
}
$catalog = $catalog | Sort-Object Name, PreferredPath

$runAt = Get-Date -Format 'yyyy-MM-dd HH:mm'
$sourceCounts = $instances | Group-Object SourceType | Sort-Object Count -Descending
$activeCount = @($instances | Where-Object { $_.SourceType -eq '个人已安装 / 可直接调用' }).Count
$uniqueActiveCount = @($catalog | Where-Object { $_.SourceType -match '个人已安装 / 可直接调用' }).Count
$sourceUrlCount = @($catalog | Where-Object SourceUrl).Count

$overview = @()
$overview += '# 本机 Skills 目录'
$overview += ''
$overview += "> 更新时间：$runAt；扫描范围：个人可直接调用的 `C:\Users\89836\.codex\skills` 与 `C:\Users\89836\.agents\skills`。"
$overview += ''
$overview += '## 先看结论'
$overview += ''
$overview += "- 找到 **$($instances.Count)** 个文件副本，按文件内容去重后为 **$($catalog.Count)** 个技能条目。"
$overview += "- 其中 **$activeCount** 个副本位于个人已安装目录，对应 **$uniqueActiveCount** 个可直接调用的技能条目。"
$overview += "- 已从统计中排除 **$($excludedSkillNames.Count)** 个当前最不可能日常使用的技能；这不删除或停用任何实际 Skill。"
$overview += "- **$sourceUrlCount** 个技能条目能从本地插件清单中确认仓库或主页地址。其余不等于【不开源】，只是本地元数据未声明，不能编造链接。"
$overview += '- 插件市场源码、缓存和应用内置副本不一定已安装或可在当前对话中调用；请以“来源类型”和本地路径为准。'
$overview += ''
$overview += '## 文件说明'
$overview += ''
$overview += '- [[01_完整技能目录]]：当前日常可用范围内、按内容去重后的主目录，包含功能、可复制提示词、来源和本地路径。'
$overview += '- [[02_全部文件副本]]：当前日常可用范围内的所有文件副本及重复关系。'
$overview += '- [[03_可直接调用技能速查]]：只看个人已安装目录中的技能，最适合日常使用。'
$overview += '- [[更新本机技能目录.ps1]]：重新扫描并刷新这套目录的脚本；只读原始 Skill 文件。'
$overview += ''
$overview += '## 来源分布（文件副本）'
$overview += ''
$overview += '| 来源类型 | 文件数 |'
$overview += '|---|---:|'
foreach ($item in $sourceCounts) { $overview += "| $(Escape-MarkdownCell $item.Name) | $($item.Count) |" }
Set-Content -LiteralPath (Join-Path $catalogRoot '00_总览.md') -Value $overview -Encoding UTF8

$main = @('# 完整技能目录', '', '> 同内容副本已合并。来源地址优先取插件 manifest 的 repository，其次 homepage；“参考链接”来自技能说明中出现的 URL，并不必然是开源仓库。', '', '| 技能名称 | 功能 | 配套提示词（可复制） | 来源类型 | 插件 | 开源/来源地址 | 参考链接 | 本地路径 | 副本数 |', '|---|---|---|---|---|---|---|---|---:|')
foreach ($skill in $catalog) {
    $sourceLink = if ($skill.SourceUrl) { "[$($skill.SourceUrl)]($($skill.SourceUrl))" } else { '本地元数据未声明' }
    $referenceLinks = if ($skill.ReferenceUrls) { (($skill.ReferenceUrls -split ' \| ') | ForEach-Object { "[$_]($_)" }) -join '<br>' } else { '' }
    $local = '`' + $skill.PreferredPath + '`'
    $main += "| $(Escape-MarkdownCell $skill.Name) | $(Escape-MarkdownCell $skill.Function) | $(Escape-MarkdownCell $skill.Prompt) | $(Escape-MarkdownCell $skill.SourceType) | $(Escape-MarkdownCell $skill.Plugin) | $sourceLink | $referenceLinks | $local | $($skill.InstanceCount) |"
}
Set-Content -LiteralPath (Join-Path $catalogRoot '01_完整技能目录.md') -Value $main -Encoding UTF8

$allCopies = @('# 全部 Skill 文件副本', '', '> 这是当前统计范围内未去重的清单；20 个不常用 Skill 已从统计中排除。相同 SHA-256 表示文件内容完全一致。', '', '| 技能名称 | 来源类型 | 插件 | SHA-256 | 本地路径 |', '|---|---|---|---|---|')
foreach ($item in ($instances | Sort-Object Name, LocalPath)) {
    $hashCell = '`' + $item.Hash + '`'
    $pathCell = '`' + $item.LocalPath + '`'
    $allCopies += "| $(Escape-MarkdownCell $item.Name) | $(Escape-MarkdownCell $item.SourceType) | $(Escape-MarkdownCell $item.Plugin) | $hashCell | $pathCell |"
}
Set-Content -LiteralPath (Join-Path $catalogRoot '02_全部文件副本.md') -Value $allCopies -Encoding UTF8

$quick = @('# 可直接调用技能速查', '', '> 仅列出 `C:\Users\89836\.codex\skills` 和 `C:\Users\89836\.agents\skills` 下的技能；它们通常比缓存和市场源码更值得优先使用。', '')
foreach ($skill in ($catalog | Where-Object { $_.SourceType -match '个人已安装 / 可直接调用' } | Sort-Object Name)) {
    $quick += "## $($skill.Name)"
    $quick += ''
    $quick += "- **功能**：$($skill.Function)"
    $quick += "- **提示词**：$($skill.Prompt)"
    $quick += ('- **本地位置**：`' + $skill.PreferredPath + '`')
    if ($skill.SourceUrl) { $quick += "- **开源/来源**：$($skill.SourceUrl)" }
    $quick += ''
}
Set-Content -LiteralPath (Join-Path $catalogRoot '03_可直接调用技能速查.md') -Value $quick -Encoding UTF8

$instances | Select-Object Name, Description, SourceType, Plugin, SourceUrl, ReferenceUrls, LocalPath, Hash |
    Export-Csv -LiteralPath (Join-Path $catalogRoot '全部文件副本.csv') -NoTypeInformation -Encoding UTF8
$catalog | Select-Object Name, Function, Prompt, SourceType, Plugin, SourceUrl, ReferenceUrls, PreferredPath, InstanceCount |
    Export-Csv -LiteralPath (Join-Path $catalogRoot '去重技能目录.csv') -NoTypeInformation -Encoding UTF8

Write-Output "文件副本：$($instances.Count)"
Write-Output "去重技能：$($catalog.Count)"
Write-Output "输出目录：$catalogRoot"



