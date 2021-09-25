variable "auth0_domain" {
  type = string
}

variable "auth0_client_id" {
  type = string
}

variable "auth0_client_secret" {
  type = string
}

locals {
  app_name = "soccer"
  env_name = "prod"
  name = "${local.env_name}-${local.app_name}"
  location = "Central US"
  resource_group_name = "rg-${local.name}"
  dist_directory = "${path.cwd}/../../../../dist"
}

resource "azurerm_resource_group" "resource_group" {
  location = local.location
  name = local.resource_group_name
}

module "api" {
  source = "../../modules/azure_function"

  name = "${local.name}-api"
  location = local.location
  resource_group_name = local.resource_group_name
  api_directory = "${local.dist_directory}/apps/rest-api"
  auth0_domain = var.auth0_domain
  auth0_client_id = var.auth0_client_id
  auth0_client_secret = var.auth0_client_secret

  depends_on = [azurerm_resource_group.resource_group]
}

module "site" {
  source = "../../modules/azure_static_site"

  name = "${local.name}-site"
  location = local.location
  resource_group_name = local.resource_group_name
  audience = module.api.api_identifier
  site_directory = "${local.dist_directory}/apps/web-ui"
  api_url = module.api.function_app_url
  auth0_domain = var.auth0_domain

  depends_on = [azurerm_resource_group.resource_group, module.api]
}
