/**
 * @fileOverview FreeMind 文件格式支持
 *
 * Freemind 文件后缀为 .mm，实际上是一个 XML 文件
 * @see http://freemind.sourceforge.net/
 */
kityminder.data.registerProtocol('freemind', function (minder) {
    // 标签 map
    var markerMap = {
        'full-1': ['priority', 1],
        'full-2': ['priority', 2],
        'full-3': ['priority', 3],
        'full-4': ['priority', 4],
        'full-5': ['priority', 5],
        'full-6': ['priority', 6],
        'full-7': ['priority', 7],
        'full-8': ['priority', 8]
    };

    function processTopic(topic, obj) {

        //处理文本
        obj.data = {
            text: topic.TEXT
        };
        var i;

        // 处理标签
        if (topic.icon) {
            var icons = topic.icon;
            var type;
            if (icons.length && icons.length > 0) {
                for (i in icons) {
                    type = markerMap[icons[i].BUILTIN];
                    if (type) obj.data[type[0]] = type[1];
                }
            } else {
                type = markerMap[icons.BUILTIN];
                if (type) obj.data[type[0]] = type[1];
            }
        }

        // 处理超链接
        if (topic.LINK) {
            obj.data.hyperlink = topic.LINK;
        }

        //处理子节点
        if (topic.node) {

            var tmp = topic.node;
            if (tmp.length && tmp.length > 0) { //多个子节点
                obj.children = [];

                for (i in tmp) {
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
        processTopic(json.node, result);
        return result;
    }

    return {
        fileDescription: 'Freemind 格式',
        fileExtension: '.mm',
        dataType: 'text',

        decode: function (local) {
            return new Promise(function (resolve, reject) {
                try {
                    resolve(xml2km(local));
                } catch (e) {
                    reject(new Error('XML 文件损坏！'));
                }
            });
        },

        encode: function (json, km, options) {
            // var url = 'native-support/export.php';

            return (
              '<map version="1.0.1">\n' +
                '<!-- To view this file, download free mind mapping software FreeMind from http://freemind.sourceforge.net -->\n' +
                genTopic(json.root) +
              '</map>\n'
            );

            function genTopic (root) {
              var data = root.data;
              var attrs = [
                ['CREATED', data.created],
                ['ID', data.id],
                ['MODIFIED', data.created],
                ['MODIFIED', data.created],
                ['TEXT', data.text],
                ['POSITION', data.position]
              ];
              return (
                '<node' + genAttrs(attrs) + '>\n' +
                  (root.children ? root.children.map(genTopic).join('\n') : '') +
                  (data.priority ? ('<icon BUILTIN="full-' + data.priority +'"/>\n') : '') +
                  (data.image ? (
                    '<richcontent TYPE="NODE"><html><head></head><body>\n' +
                      '<img' + genAttrs([['src', data.image], ['width', data.imageSize.width], ['height', data.imageSize.height]]) + '/>\n' +
                    '</body></html></richcontent>\n'
                  ) : '') +
                '</node>\n'
              );
            }

            function genAttrs (pairs) {
              return pairs.map(function (x) {
                return x[1] ? (' ' + x[0] + '="' + x[1] + '"') : ''
              }).join('');
            }

            // function fetch() {
            //     return new Promise(function(resolve, reject) {
            //         var xhr = new XMLHttpRequest();
            //         xhr.open('POST', url);

            //         xhr.responseType = 'blob';
            //         xhr.onload = resolve;
            //         xhr.onerror = reject;

            //         var form = new FormData();
            //         form.append('type', 'freemind');
            //         form.append('data', data);

            //         xhr.send(form);
            //     }).then(function(e) {
            //         return e.target.response;
            //     });
            // }

            // function download() {
            //     var filename = options.filename || 'freemind.mm';

            //     var form = document.createElement('form');
            //     form.setAttribute('action', url);
            //     form.setAttribute('method', 'POST');
            //     form.appendChild(field('filename', filename));
            //     form.appendChild(field('type', 'freemind'));
            //     form.appendChild(field('data', data));
            //     form.appendChild(field('download', '1'));
            //     document.body.appendChild(form);
            //     form.submit();
            //     document.body.removeChild(form);

            //     function field(name, content) {
            //         var input = document.createElement('input');
            //         input.type = 'hidden';
            //         input.name = name;
            //         input.value = content;
            //         return input;
            //     }
            // }

            // if (options && options.download) {
            //     return download();
            // } else {
            //     return fetch();
            // }
        }
    };

} ());
