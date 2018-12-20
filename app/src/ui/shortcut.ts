export function shortcutDialog() {
  let html = `
  <div class="modal-body shortcut-dialog ng-scope">
    <!-- ngRepeat: group in shortcut -->
    <section ng-repeat="group in shortcut" class="ng-scope">
      <h3 class="ng-binding">节点操作</h3>
      <!-- ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Enter" title="Enter">Enter</span></span
        >
        <span class="description ng-binding"> 插入兄弟节点</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Tab" title="Tab">Tab</span>,
          <span class="shortcut-key Insert" title="Insert">Insert</span></span
        >
        <span class="description ng-binding"> 插入子节点</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Shift" title="Shift">Shift</span> +
          <span class="shortcut-key Tab" title="Tab">Tab</span></span
        >
        <span class="description ng-binding"> 插入父节点</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Delete" title="Delete">Delete</span></span
        >
        <span class="description ng-binding"> 删除节点</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Up" title="Up">Up</span>,
          <span class="shortcut-key Down" title="Down">Down</span>,
          <span class="shortcut-key Left" title="Left">Left</span>,
          <span class="shortcut-key Right" title="Right">Right</span></span
        >
        <span class="description ng-binding"> 节点导航</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Alt" title="Alt">Alt</span> +
          <span class="shortcut-key Up" title="Up">Up</span>,
          <span class="shortcut-key Down" title="Down">Down</span></span
        >
        <span class="description ng-binding"> 向上/向下调整顺序</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key /" title="/">/</span></span
        >
        <span class="description ng-binding"> 展开/收起节点</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key F2" title="F2">F2</span></span
        >
        <span class="description ng-binding"> 编辑节点</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Shift" title="Shift">Shift</span> +
          <span class="shortcut-key Enter" title="Enter">Enter</span></span
        >
        <span class="description ng-binding"> 文本换行</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key A" title="A">A</span></span
        >
        <span class="description ng-binding"> 全选节点</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key C" title="C">C</span></span
        >
        <span class="description ng-binding"> 复制节点</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key X" title="X">X</span></span
        >
        <span class="description ng-binding"> 剪切节点</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key V" title="V">V</span></span
        >
        <span class="description ng-binding"> 粘贴节点</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key B" title="B">B</span></span
        >
        <span class="description ng-binding"> 加粗</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key I" title="I">I</span></span
        >
        <span class="description ng-binding"> 斜体</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key F" title="F">F</span></span
        >
        <span class="description ng-binding"> 查找节点</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
    </section>
    <!-- end ngRepeat: group in shortcut -->
    <section ng-repeat="group in shortcut" class="ng-scope">
      <h3 class="ng-binding">视野控制</h3>
      <!-- ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Alt" title="Alt">Alt</span> +
          <span class="shortcut-key 拖动" title="拖动">拖动</span>,
          <span class="shortcut-key 右键拖动" title="右键拖动"
            >右键拖动</span
          ></span
        >
        <span class="description ng-binding"> 拖动视野</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key 滚轮" title="滚轮">滚轮</span>,
          <span class="shortcut-key 触摸板" title="触摸板">触摸板</span></span
        >
        <span class="description ng-binding"> 移动视野</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key 空白处双击" title="空白处双击"
            >空白处双击</span
          >, <span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key Enter" title="Enter">Enter</span></span
        >
        <span class="description ng-binding"> 居中根节点</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key +" title="+">+</span>,
          <span class="shortcut-key -" title="-">-</span></span
        >
        <span class="description ng-binding"> 放大/缩小视野</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
    </section>
    <!-- end ngRepeat: group in shortcut -->
    <section ng-repeat="group in shortcut" class="ng-scope">
      <h3 class="ng-binding">布局</h3>
      <!-- ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key Shift" title="Shift">Shift</span> +
          <span class="shortcut-key L" title="L">L</span></span
        >
        <span class="description ng-binding"> 整理布局</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
    </section>
    <!-- end ngRepeat: group in shortcut -->
    <section ng-repeat="group in shortcut" class="ng-scope">
      <h3 class="ng-binding">后悔药</h3>
      <!-- ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key Z" title="Z">Z</span></span
        >
        <span class="description ng-binding"> 撤销</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key Y" title="Y">Y</span></span
        >
        <span class="description ng-binding"> 重做</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
    </section>
    <!-- end ngRepeat: group in shortcut -->
  </div>
  `;

  bootbox.dialog({
    title: "快捷键",
    message: html
  });
}
