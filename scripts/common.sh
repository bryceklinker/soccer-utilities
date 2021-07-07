#!/bin/bash

set -ex

export WORKING_DIRECTORY="${GITHUB_WORKSPACE}"
export APPS_DIST_DIRECTORY="${WORKING_DIRECTORY}/dist/apps"
export REST_API_OUTPUT_DIRECTORY="${APPS_DIST_DIRECTORY}/rest-api"
export REST_API_ARCHIVE_PATH="${APPS_DIST_DIRECTORY}/rest-api.zip"
export ENVIRONMENTS_DIRECTORY="${WORKING_DIRECTORY}/apps/infrastructure/environments"

function install_npm_packages() {
  npm ci
}
