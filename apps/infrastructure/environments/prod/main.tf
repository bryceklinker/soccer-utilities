variable "auth0_domain" {
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


module "api" {
  source = "../../modules/azure_function"

  name = "${local.name}-api"
  location = local.location
  resource_group_name = local.resource_group_name
  api_directory = "${local.dist_directory}/apps/rest-api"
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
}
