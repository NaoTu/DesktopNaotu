import { I18n } from "../core/i18n";

export function shortcutDialog() {
  let html = `
  <div class="modal-body shortcut-dialog ng-scope">
    <!-- ngRepeat: group in shortcut -->
    <section ng-repeat="group in shortcut" class="ng-scope">
      <h3 class="ng-binding">${ I18n.__("dShortcut_NodeOperation") }</h3>
      <!-- ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Enter" title="Enter">Enter</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_InsertSiblingNode") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Tab" title="Tab">Tab</span>,
          <span class="shortcut-key Insert" title="Insert">Insert</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_InsertChildNode") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Shift" title="Shift">Shift</span> +
          <span class="shortcut-key Tab" title="Tab">Tab</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_InsertParentNode") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Delete" title="Delete">Delete</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_RemoveNode") }</span>
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
        <span class="description ng-binding"> ${ I18n.__("dShortcut_Navigation") }</span>
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
        <span class="description ng-binding"> ${ I18n.__("dShortcut_ReorderNodeUpDown") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key /" title="/">/</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_ExpandOrCollapse") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key F2" title="F2">F2</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_EditNode") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Shift" title="Shift">Shift</span> +
          <span class="shortcut-key Enter" title="Enter">Enter</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_TextNewline") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key A" title="A">A</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_SelectAll") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key C" title="C">C</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_CopyNode") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key X" title="X">X</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_CutNode") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key V" title="V">V</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_PasteNode") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key B" title="B">B</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_Bold") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key I" title="I">I</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_Italic") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key F" title="F">F</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_FindNode") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
    </section>
    <!-- end ngRepeat: group in shortcut -->
    <section ng-repeat="group in shortcut" class="ng-scope">
      <h3 class="ng-binding">${ I18n.__("dShortcut_ScopeControl") }</h3>
      <!-- ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Alt" title="Alt">Alt</span> +
          <span class="shortcut-key ${ I18n.__("dShortcut_Drag") }" title="${ I18n.__("dShortcut_Drag") }">${ I18n.__("dShortcut_Drag") }</span>,
          <span class="shortcut-key ${ I18n.__("dShortcut_DragWithMouseRight") }" title="${ I18n.__("dShortcut_DragWithMouseRight") }"
            >${ I18n.__("dShortcut_DragWithMouseRight") }</span
          ></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_DragScope") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key ${ I18n.__("dShortcut_Mousewheel") }" title="${ I18n.__("dShortcut_Mousewheel") }">${ I18n.__("dShortcut_Mousewheel") }</span>,
          <span class="shortcut-key ${ I18n.__("dShortcut_Touchpad") }" title="${ I18n.__("dShortcut_Touchpad") }">${ I18n.__("dShortcut_Touchpad") }</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_MoveScope") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key ${ I18n.__("dShortcut_DblClickOnSpace") }" title="${ I18n.__("dShortcut_DblClickOnSpace") }"
            > ${ I18n.__("dShortcut_DblClickOnSpace") }</span
          >, <span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key Enter" title="Enter">Enter</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_PlaceRootOnCentral") }</span>
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
        <span class="description ng-binding"> ${ I18n.__("dShortcut_ZoomScope") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
    </section>
    <!-- end ngRepeat: group in shortcut -->
    <section ng-repeat="group in shortcut" class="ng-scope">
      <h3 class="ng-binding">${ I18n.__("dShortcut_Layout") }</h3>
      <!-- ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key Shift" title="Shift">Shift</span> +
          <span class="shortcut-key L" title="L">L</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_PutLayoutInOrder") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
    </section>
    <!-- end ngRepeat: group in shortcut -->
    <section ng-repeat="group in shortcut" class="ng-scope">
      <h3 class="ng-binding">${ I18n.__("dShortcut_Regrets") }</h3>
      <!-- ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key Z" title="Z">Z</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_Undo") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
      <div class="shortcut-group ng-scope" ng-repeat="k in group.groupItem">
        <span
          class="shortcut ng-binding"
          ng-bind-html="genKeyDOM(k.key) | trusted"
          ><span class="shortcut-key Ctrl" title="Ctrl">Ctrl</span> +
          <span class="shortcut-key Y" title="Y">Y</span></span
        >
        <span class="description ng-binding"> ${ I18n.__("dShortcut_Redo") }</span>
      </div>
      <!-- end ngRepeat: k in group.groupItem -->
    </section>
    <!-- end ngRepeat: group in shortcut -->
  </div>
  `;

  bootbox.dialog({
    title: I18n.__("dShortcut"),
    message: html
  });
}
