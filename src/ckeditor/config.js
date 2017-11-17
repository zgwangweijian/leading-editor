/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';

    config.language = 'zh-CN';
    config.pasteFilter = null; //粘贴过滤器设置为null 即可
    config.allowedContent = {//内容规则 允许的标签
        $1: {
            // Use the ability to specify elements as an object.
            elements: CKEDITOR.dtd,
            attributes: true,
            styles: true,
            classes: true
        }
    };
    config.extraPlugins = 'link,leadingimage';

    config.toolbar = "Common";
    config.toolbar_Common =
        [
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['NumberedList', 'BulletedList'],
            ['Outdent', 'Indent'],
            ['Link', 'Unlink', 'Anchor'],
            ['Chart', 'Iframe'],
            ['HorizontalRule', 'Blockquote', 'ShowBlocks'],
            ['Source'],
            '/',
            ['Font', 'FontSize'],
            ['Bold', 'Italic', 'Underline', 'Strike'],
            ['TextColor', 'BGColor'],
            ['LeadingImage', 'Table'],
            ['CopyFormatting', 'RemoveFormat'],
            ['Preview', 'Maximize']
        ];
};
