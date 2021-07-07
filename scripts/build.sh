#!/bin/bash

set -ex

source "./scripts/common.sh"

function run_tests() {
  npm test
}

function build_applications() {
  npm run build
}

function install_function_app_packages() {
  pushd "${REST_API_OUTPUT_DIRECTORY}" || exit 1
  npm install --production
  popd || exit 1
}

function archive_function_app() {
  pushd "${REST_API_OUTPUT_DIRECTORY}" || exit 1
  zip -qq -rm "${REST_API_ARCHIVE_PATH}" -- *
  popd || exit 1
}

function main() {
  install_npm_packages
  run_tests
  build_applications
  install_function_app_packages
  archive_function_app
}

main
