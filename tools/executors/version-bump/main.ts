import { ExecutorContext } from '@nrwl/devkit';
import * as standardVersion from 'standard-version';
import { PackageJsonLocator } from './src/package-json-locator';
import { VersionBumpOptions } from './src/version-bump-options';
import { VersionOptionsFactory } from './src/version-options-factory';

export default async function bumpVersion(
  options: VersionBumpOptions,
  context: ExecutorContext
) {
  const packageJsons = PackageJsonLocator.getAll(context);
  const versionOptions = VersionOptionsFactory.create(packageJsons, options);
  try {
    await standardVersion(versionOptions);
    return { success: true };
  } catch {
    return { success: false };
  }
}
