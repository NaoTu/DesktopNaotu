/**
 * 重做
 * 
 * 快捷键：Ctrl + Y
 * 行为：恢复上一次撤销
 */
export function redo() {
  editor.history.redo();
}

/**
 * 撤销
 * 
 * 快捷键：Ctrl + Z
 * 行为：撤销上一步操作
 */
export function undo() {
  editor.history.undo();
}
