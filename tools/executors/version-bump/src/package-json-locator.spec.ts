import { ExecutorContext } from '@nrwl/devkit';
import { readWorkspaceJson } from '@nrwl/workspace';
import * as path from 'path';
import { PackageJsonLocator } from './package-json-locator';

const REPO_ROOT_PATH = path.resolve(__dirname, '..', '..', '..', '..');
describe('package-json-locator', () => {
  let context: ExecutorContext;

  beforeEach(() => {
    context = {
      cwd: '.',
      root: REPO_ROOT_PATH,
      isVerbose: false,
      workspace: readWorkspaceJson(),
    };
  });

  test('when getting package jsons then returns all package json paths', () => {
    const paths = PackageJsonLocator.getAll(context);

    expect(paths).toContainEqual(
      path.resolve(REPO_ROOT_PATH, 'libs', 'common-ui', 'package.json')
    );
    expect(paths).toContainEqual(
      path.resolve(REPO_ROOT_PATH, 'apps', 'rest-api', 'package.json')
    );
  });

  test('when getting package jsons then returns root package json first', () => {
    const paths = PackageJsonLocator.getAll(context);

    expect(paths[0]).toEqual(path.resolve(REPO_ROOT_PATH, 'package.json'));
  });
});
