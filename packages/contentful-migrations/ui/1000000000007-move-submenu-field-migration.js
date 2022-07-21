module.exports = function (migration) {
  const tPage = migration.editContentType('t-page');
  tPage.moveField('submenu').afterField('parent_page');

  // Move field in editor layout (Compose only)
  const editorLayout = tPage.editEditorLayout();
  editorLayout.moveField('submenu').afterField('parent_page');
};
