#!/bin/bash

set -ex

source "./scripts/common.sh"

export TARGET_ENVIRONMENT="prod"
export TARGET_ENVIRONMENT_DIRECTORY="${ENVIRONMENTS_DIRECTORY}/${TARGET_ENVIRONMENT}"
export PLAN_PATH="${ENVIRONMENTS_DIRECTORY}/${TARGET_ENVIRONMENT}.tfplan"

function extract_rest_api_archive() {
  mkdir -p "${REST_API_OUTPUT_DIRECTORY}"
  unzip -qq "${WORKING_DIRECTORY}/rest-api.zip" -d "${REST_API_OUTPUT_DIRECTORY}"
}

function initialize_terraform() {
  pushd "${TARGET_ENVIRONMENT_DIRECTORY}" || exit 1
  terraform init
  popd || exit 1
}

function create_terraform_plan() {
  pushd "${TARGET_ENVIRONMENT_DIRECTORY}" || exit 1
  terraform plan -var="auth0_domain=${AUTH0_DOMAIN}" -out "${PLAN_PATH}"
  popd || exit 1
}

function apply_terraform_plan() {
  pushd "${TARGET_ENVIRONMENT_DIRECTORY}" || exit 1
  terraform apply "${PLAN_PATH}"
  popd || exit 1
}

function warm_up_function_app() {
  pushd "${TARGET_ENVIRONMENT_DIRECTORY}" || exit 1
  curl "$(terraform output -raw function_app_url)/.health"
  popd || exit 1
}

function run_end_to_end_tests() {
  npm run e2e
}

function main() {
  extract_rest_api_archive
  install_npm_packages
  initialize_terraform
  create_terraform_plan
  apply_terraform_plan
  warm_up_function_app
  run_end_to_end_tests
}

main
