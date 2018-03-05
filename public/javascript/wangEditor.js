var E = window.wangEditor;
var editor = new E('#content-div');

//editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
editor.customConfig.uploadImgServer = '/article/upload';
editor.customConfig.uploadFileName = 'img';
var $text1 = $('#content-area');
editor.customConfig.onchange = function (html) {
    // 监控变化，同步更新到 textarea
    $text1.val(html);
}
editor.create();
// 初始化 textarea 的值
$text1.val(editor.txt.html());