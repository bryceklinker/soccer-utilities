'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.VersionOptionsFactory = void 0;
function create(packageJsons, options) {
  return {
    commitAll: true,
    packageFiles: packageJsons,
    noVerify: true,
    bumpFiles: packageJsons,
    releaseAs: options.bump,
    releaseCommitMessageFormat:
      'chore(release): Bumping version to {{currentTag}}',
    skip: {
      changelog: true,
    },
  };
}
exports.VersionOptionsFactory = {
  create: create,
};
//# sourceMappingURL=version-options-factory.js.map
