#!/bin/bash

set -ex

source "./scripts/common.sh"

export TERRAFORM_VERSION="1.0.1"
export TARGET_ENVIRONMENT="prod"
export TARGET_ENVIRONMENT_DIRECTORY="${ENVIRONMENTS_DIRECTORY}/${TARGET_ENVIRONMENT}"
export PLAN_PATH="${ENVIRONMENTS_DIRECTORY}/${TARGET_ENVIRONMENT}.tfplan"

function install_terraform() {
  sudo apt-get update && sudo apt-get install -y gnupg software-properties-common curl
  curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
  sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
  sudo apt-get update && sudo apt-get install terraform="${TERRAFORM_VERSION}"
}

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
  FUNCTION_APP_URL=$(terraform output -raw function_app_url)
  pushd "${TARGET_ENVIRONMENT_DIRECTORY}" || exit 1
  curl "${FUNCTION_APP_URL}/.health"
  curl "${FUNCTION_APP_URL}/.health"
  curl "${FUNCTION_APP_URL}/.health"
  popd || exit 1
}

function run_end_to_end_tests() {
  pushd "${TARGET_ENVIRONMENT_DIRECTORY}" || exit 1
  export CYPRESS_BASE_URL="$(terraform output -raw web_site_url)"
  export CYPRESS_API_URL="$(terraform output -raw function_app_url)"
  popd || exit 1

  npm run e2e
}

function main() {
  install_terraform
  extract_rest_api_archive
  install_npm_packages
  initialize_terraform
  create_terraform_plan
  apply_terraform_plan
  warm_up_function_app
  run_end_to_end_tests
}

main
