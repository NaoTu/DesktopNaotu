var grunt = require('grunt');

// 配置
grunt.config.init({
    pkg: grunt.file.readJSON('gruntPackage.json'),
    'create-windows-installer': {
        x64: {
            version: '0.1.5',
            authors: "'Jack' <'topcss@gmail.com'>",
            projectUrl: "https://github.com/NaoTu/DesktopNaotu",
            appDirectory: '../OutApp/DesktopNaotu-win32-ia32',// 要打包的输入目录
            outputDirectory: '../OutPut',// grunt打包后的输出目录
            exe: 'DesktopNaotu.exe',
            description: '桌面版脑图',
            setupIcon: "./favicon.ico",
            noMsi: true
        }
    }
});

// 加载任务
grunt.loadNpmTasks('grunt-electron-installer');

// 设置为默认
grunt.registerTask('default', ['create-windows-installer']);