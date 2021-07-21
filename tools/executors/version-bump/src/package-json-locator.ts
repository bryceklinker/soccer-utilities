import * as path from 'path';
import { ExecutorContext } from '@nrwl/devkit';

function getAll(context: ExecutorContext): Array<string> {
  const workspacePackages = Object.values(context.workspace.projects)
    .map(p => path.resolve(p.root, 'package.json'));

  return [
    path.resolve(context.root, 'package.json'),
    ...workspacePackages
  ]
}

export const PackageJsonLocator = {
  getAll
};
