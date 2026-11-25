[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot

Push-Location $projectRoot
try {
    & npm run check
    if ($LASTEXITCODE -ne 0) {
        throw "Local checks failed with exit code $LASTEXITCODE. Review the API, build, Remotion bundle, and Playwright diagnostics above."
    }
}
finally {
    Pop-Location
}
