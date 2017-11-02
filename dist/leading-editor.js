/*!
 * leading-editor
 * 
 * Version: 1.0.3 - 2017-11-02T07:53:57.735Z
 * License: 
 */


(function () {
    "use strict";
    (function () {
        var leadingEditorModule;
        leadingEditorModule = angular.module("leading.editor", []);

        leadingEditorModule.constant('editorConfig', {
            language: 'zh-cn'
        });
        leadingEditorModule.directive("editor", ['editorConfig',
            function (editorConfig) {
                return {
                    restrict: "EA",
                    require: "ngModel",
                    scope: {
                        ready: "="
                    },
                    link: function ($scope, $element, $attrs, ctrl) {
                        var _LDEditor, _updateByRender;
                        _updateByRender = false;
                        _LDEditor = (function () {
                            function _LDEditor() {
                                //var _self = this;
                               // _self.bindRender();
                                //_self.initEditor();
                            }

                            _LDEditor.prototype.initEditor = function () {
                                var _EConfig, _editorId, _self;
                                _self = this;
                                if (typeof CKEDITOR === 'undefined') {
                                    console.error("Please import the local resources of ckeditor!");
                                    return;
                                }
                                _EConfig = $scope.config ? $scope.config : {};
                                if (editorConfig) {
                                    _EConfig = angular.extend({}, editorConfig);
                                }
                                var config = $scope.$eval($attrs.editor);
                                if (config) {
                                    _EConfig = angular.extend({}, _EConfig, config);
                                }

                                _editorId = $attrs.id ? $attrs.id : "_editor" + (Date.now());
                                $element[0].id = _editorId;

                                this.editor = CKEDITOR.replace(_editorId, _EConfig);

                                return $.when( this.editor.promise ).then( function() {
                                    _self.editorReady = true;
                                    _self.editor.on("change", function (evt) {
                                        ctrl.$setViewValue(evt.editor.getData());
                                        if (!_updateByRender) {
                                            if (!$scope.$$phase) {
                                                $scope.$apply();
                                            }
                                        }
                                        _updateByRender = false;
                                    });
                                    _self.editor.on("'blur", function (evt) {
                                        ctrl.$setViewValue(evt.editor.getData());
                                        if (!_updateByRender) {
                                            if (!$scope.$$phase) {
                                                $scope.$apply();
                                            }
                                        }
                                        _updateByRender = false;
                                    });
                                    if (_self.modelContent && _self.modelContent.length > 0) {
                                        _self.setEditorContent();
                                    }
                                    if (typeof $scope.ready === "function") {
                                        $scope.ready(_self.editor);
                                    }
                                    $scope.$on("$destroy", function () {
                                        _self.editor.destroy();
                                    });
                                });
                            };

                            _LDEditor.prototype.setEditorContent = function (content) {
                                if (!content) {
                                    content = this.modelContent;
                                }
                                if (this.editor && this.editorReady) {
                                    this.editor.setData(content);
                                }
                            };

                            _LDEditor.prototype.bindRender = function () {
                                var _self;
                                _self = this;
                                ctrl.$render = function () {
                                    _self.modelContent = (ctrl.$isEmpty(ctrl.$viewValue) ? "" : ctrl.$viewValue);
                                    _updateByRender = true;
                                    _self.setEditorContent();
                                };
                            };

                            return _LDEditor;

                        })();
                        var editorInstance = new _LDEditor();
                        editorInstance.bindRender();
                        editorInstance.initEditor();
                    }
                };
            }
        ]);
    })();
}).call();