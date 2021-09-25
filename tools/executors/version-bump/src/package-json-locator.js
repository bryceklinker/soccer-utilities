'use strict';
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
      to[j] = from[i];
    return to;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.PackageJsonLocator = void 0;
var path = require('path');
function getAll(context) {
  var workspacePackages = Object.values(context.workspace.projects).map(
    function (p) {
      return path.resolve(p.root, 'package.json');
    }
  );
  return __spreadArray(
    [path.resolve(context.root, 'package.json')],
    workspacePackages
  );
}
exports.PackageJsonLocator = {
  getAll: getAll,
};
//# sourceMappingURL=package-json-locator.js.map
