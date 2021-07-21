import { VersionBumpOptions } from './version-bump-options';
import { Options } from 'standard-version';

function create(packageJsons: Array<string>, options: VersionBumpOptions): Options {
  return {
    commitAll: true,
    packageFiles: packageJsons,
    bumpFiles: packageJsons,
    releaseAs: options.bump,
    releaseCommitMessageFormat: 'chore(release): Bumping version to {{currentTag}}',
    skip: {
      changelog: true
    }
  }
}

export const VersionOptionsFactory = {
  create
}
