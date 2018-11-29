function shortcut() {
  var shortcutKeys = [
    {
      groupName: "节点操作",
      groupItem: [
        { key: "Enter", desc: " 插入兄弟节点" },
        { key: "Tab, Insert", desc: " 插入子节点" },
        { key: "Shift + Tab", desc: " 插入父节点" },
        { key: "Delete", desc: " 删除节点" },
        { key: "Up, Down, Left, Right", desc: " 节点导航" },
        { key: "Alt + Up, Down", desc: " 向上/向下调整顺序" },
        { key: "/", desc: " 展开/收起节点" },
        { key: "F2", desc: " 编辑节点" },
        { key: "Shift + Enter", desc: " 文本换行" },
        { key: "Ctrl + A", desc: " 全选节点" },
        { key: "Ctrl + C", desc: " 复制节点" },
        { key: "Ctrl + X", desc: " 剪切节点" },
        { key: "Ctrl + V", desc: " 粘贴节点" },
        { key: "Ctrl + B", desc: " 加粗" },
        { key: "Ctrl + I", desc: " 斜体" },
        { key: "Ctrl + F", desc: " 查找节点" }
      ]
    },
    {
      groupName: "视野控制",
      groupItem: [
        //{ key:"Ctrl + ESC",desc:" 全屏切换"},
        { key: "Alt + 拖动, 右键拖动", desc: " 拖动视野" },
        { key: "滚轮, 触摸板", desc: " 移动视野" },
        //{ key:"Ctrl + Up, Down, Left, Right",desc:" 视野导航"},
        { key: "空白处双击, Ctrl + Enter", desc: " 居中根节点" },
        { key: "Ctrl + +, -", desc: " 放大/缩小视野" }
      ]
    },
    {
      groupName: "文件操作",
      groupItem: [
        { key: "Ctrl + O", desc: " 打开" },
        { key: "Ctrl + S", desc: " 保存" },
        { key: "Ctrl + Shift + S", desc: " 另存为" }
        // { key: "Ctrl + Alt + S", desc: " 分享" }
      ]
    },
    {
      groupName: "布局",
      groupItem: [{ key: "Ctrl + Shift + L", desc: " 整理布局" }]
    },
    {
      groupName: "后悔药",
      groupItem: [
        { key: "Ctrl + Z", desc: " 撤销" },
        { key: "Ctrl + Y", desc: " 重做" }
      ]
    }
  ];

  var text = "";
  for (var i = 0; i < shortcutKeys.length; i++) {
    var group = shortcutKeys[i];
    text += '\n' + group.groupName + '\n';
    for (var j = 0; j < group.groupItem.length; j++) {
      var item = group.groupItem[j];
      text += '       ' + item.desc + '   ' + item.key + '\n';
    }
  }

  dialog.showMessageBox({
    type: "none",
    title: "快捷键",
    message: text,
    buttons: ["OK"]
  });
}
