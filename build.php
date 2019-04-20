#!/usr/bin/php
<?php

$config = [
    'project_path' => '/work/DesktopNaotu',
    'build_path' => '/work/OutApp',
    'release_path' => '/home/www/downloads/releases'
];

function config($key) {
    global $config;
    return $config[$key];
}

function changeDir($type) {
    global $config;
    switch ($type) {
        case 'project':
            chdir(config('project_path'));
            break;
        case 'release':
            chdir(config('release_path'));
            break;
    }
}

function getAllVersions() {
    changeDir('project');
    exec('git tag', $output, $return_ver);
    if ($return_ver == 0) {
        foreach ($output as $key => $value) {
            $output[$key] = substr($value, 1);
        }
        return $output;
    } else {
        return [];
    }
}

function getExistsVersion() {
    $d = dir(config('release_path'));
    $result = [];
    while (false !== ($entry = $d->read())) {
        $full_path = config('release_path') . '/' . $entry;
        if (is_dir($full_path) && ($entry !== '.') && ($entry !== '..')) {
            $result []= $entry;
        }
    }
    return $result;
}

function getNewVersions() {
    $ignoreVersions = ['0.1.1', '0.1.3', '0.1.5', '0.1.6', '0.1.7', 
                       '1.0.0', '1.0.1', '1.0.2', '1.0.3', '1.5.2018',
                       '2.0.2018', '2.1.1',
                       '3.0.0', '3.2.0-Beta', '3.2.1-Bata'];
    $allVersions = getAllVersions();
    $existsVersions = getExistsVersion();
    $result = [];
    foreach ($allVersions as $version) {
        if (in_array($version, $ignoreVersions) || in_array($version, $existsVersions)) {
            continue;
        }
        $result []= $version;
    }
    return $result;
}

function RunCommand($command) {
    echo "Running {$command}\n";
    exec($command);
}

function package($ver, $version) {
    $currentDir = getcwd();
    changeDir('project');
    $releaseDir = config('release_path');
    $versionReleaseDir = $releaseDir . "/{$version}";
    if (!file_exists($versionReleaseDir)) {
        mkdir($versionReleaseDir);
    }
    switch ($ver) {
        case "win32":
            RunCommand("rm -rf " . config('build_path') . "/DesktopNaotu-win32-ia32");
            RunCommand('npm run packwin32');
            $dir = config('build_path') . '/DesktopNaotu-win32-ia32';
            chdir($dir);
            $archiveName = config('build_path') . "/iNaotu-{$version}-win32.7z";
            RunCommand("7za a {$archiveName} $dir/*");
            RunCommand("cp {$archiveName} {$versionReleaseDir}");
            break;
        case "win32dev":
            RunCommand("rm -rf " . config('build_path') . "/DesktopNaotu-win32-ia32");
            RunCommand('npm run packwin32dev');
            $dir = config('build_path') . '/DesktopNaotu-win32-ia32';
            chdir($dir);
            $archiveName = config('build_path') . "/iNaotu-{$version}-win32-dev.7z";
            RunCommand("7za a {$archiveName} $dir/*");
            RunCommand("cp {$archiveName} {$versionReleaseDir}");
            break;
        case "win64":
            RunCommand("rm -rf " . config('build_path') . "/DesktopNaotu-win32-x64");
            RunCommand('npm run packwin64');
            $dir = config('build_path') . '/DesktopNaotu-win32-x64';
            chdir($dir);
            $archiveName = config('build_path') . "/iNaotu-{$version}-win64.7z";
            RunCommand("7za a {$archiveName} $dir/*");
            RunCommand("cp {$archiveName} {$versionReleaseDir}");
            break;
        case "linux":
            RunCommand("rm -rf " . config('build_path') . "/DesktopNaotu-linux-x64");
            RunCommand('npm run packlinux');
            $dir = config('build_path') . '/DesktopNaotu-linux-x64';
            chdir($dir);
            $archiveName = config('build_path') . "/iNaotu-{$version}-linux-x64.7z";
            RunCommand("7za a {$archiveName} $dir/*");
            RunCommand("cp {$archiveName} {$versionReleaseDir}");
            break;
        case "macos":
            RunCommand("rm -rf " . config('build_path') . "/DesktopNaotu-darwin-x64");
            RunCommand('npm run packmacos');
            $dir = config('build_path') . '/DesktopNaotu-darwin-x64';
            chdir($dir);
            $archiveName = config('build_path') . "/iNaotu-{$version}-macos-x64.7z";
            RunCommand("7za a {$archiveName} $dir/*");
            RunCommand("cp {$archiveName} {$versionReleaseDir}");
            break;
    }
    chdir($currentDir);
}

function build($version) {
    changeDir('project');
    RunCommand('git checkout .');
    RunCommand("git checkout v{$version}");
    RunCommand('npm install');
    RunCommand('bower install');
    RunCommand('gulp');
    RunCommand("rm -rf " . config('build_path') . "/*");
    package('win32', $version);
    package('win32dev', $version);
    package('win64', $version);
    package('linux', $version);
    package('macos', $version);
}


function updateRepo() {
    changeDir('project');
    RunCommand('git checkout master');
    RunCommand('git checkout .');
    RunCommand('git pull');
}

function run() {
    updateRepo();
    $newVersions = getNewVersions();
    foreach ($newVersions as $version) {
        echo "Building {$version}\n";
        build($version);
    }
}

run();
