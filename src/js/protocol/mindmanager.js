/* global zip:true */
/*
    http://www.mindjet.com/mindmanager/
    mindmanager的后缀为.mmap，实际文件格式是zip，解压之后核心文件是Document.xml
*/
kityminder.data.registerProtocol('mindmanager', function (minder) {

    // 标签 map
    var markerMap = {
        'urn:mindjet:Prio1': ['PriorityIcon', 1],
        'urn:mindjet:Prio2': ['PriorityIcon', 2],
        'urn:mindjet:Prio3': ['PriorityIcon', 3],
        'urn:mindjet:Prio4': ['PriorityIcon', 4],
        'urn:mindjet:Prio5': ['PriorityIcon', 5],
        '0': ['ProgressIcon', 1],
        '25': ['ProgressIcon', 2],
        '50': ['ProgressIcon', 3],
        '75': ['ProgressIcon', 4],
        '100': ['ProgressIcon', 5]
    };

    function processTopic(topic, obj) {
        //处理文本
        obj.data = {
            text: topic.Text && topic.Text.PlainText || ''
        }; // 节点默认的文本，没有Text属性

        // 处理标签
        if (topic.Task) {

            var type;
            if (topic.Task.TaskPriority) {
                type = markerMap[topic.Task.TaskPriority];
                if (type) obj.data[type[0]] = type[1];
            }

            if (topic.Task.TaskPercentage) {
                type = markerMap[topic.Task.TaskPercentage];
                if (type) obj.data[type[0]] = type[1];
            }
        }

        // 处理超链接
        if (topic.Hyperlink) {
            obj.data.hyperlink = topic.Hyperlink.Url;
        }

        //处理子节点
        if (topic.SubTopics && topic.SubTopics.Topic) {

            var tmp = topic.SubTopics.Topic;
            if (tmp.length && tmp.length > 0) { //多个子节点
                obj.children = [];

                for (var i in tmp) {
                    obj.children.push({});
                    processTopic(tmp[i], obj.children[i]);
                }

            } else { //一个子节点
                obj.children = [{}];
                processTopic(tmp, obj.children[0]);
            }
        }
    }

    function xml2km(xml) {
        var json = $.xml2json(xml);
        var result = {};
        processTopic(json.OneTopic.Topic, result);
        return result;
    }

    function getEntries(file) {
        return new Promise(function (resolve, reject) {
            zip.createReader(new zip.BlobReader(file), function (zipReader) {
                zipReader.getEntries(resolve);
            }, reject);
        });
    }

    function readMainDocument(entries) {

        return new Promise(function (resolve, reject) {

            var entry, json;

            // 查找文档入口
            while ((entry = entries.pop())) {

                if (entry.filename.split('/').pop() == 'Document.xml') break;

                entry = null;

            }

            // 找到了读取数据
            if (entry) {

                entry.getData(new zip.TextWriter(), function (text) {
                    json = xml2km($.parseXML(text));
                    resolve(json);
                });

            }

            // 找不到返回失败
            else {
                reject(new Error('Main document missing'));
            }

        });
    }

    return {
        fileDescription: 'MindManager 格式',
        fileExtension: '.mmap',
        dataType: 'blob',

        decode: function (local) {
            return getEntries(local).then(readMainDocument);
        },

        // 暂时不支持编码
        encode: null,

        recognizePriority: -1
    };
} ());