import { VersionOptionsFactory } from './version-options-factory';

describe('create-version-options', () => {
  test('when options created then default settings are used', () => {
    const options = VersionOptionsFactory.create(['one', 'two'], {
      bump: 'patch',
    });

    expect(options.packageFiles).toEqual(['one', 'two']);
    expect(options.bumpFiles).toEqual(['one', 'two']);
    expect(options.commitAll).toEqual(true);
    expect(options.skip.changelog).toEqual(true);
    expect(options.releaseCommitMessageFormat).toMatch(
      'chore(release): Bumping version to {{currentTag}}'
    );
  });

  test('when options created then uses specified bump', () => {
    const options = VersionOptionsFactory.create([], { bump: 'patch' });

    expect(options.releaseAs).toEqual('patch');
  });
});
