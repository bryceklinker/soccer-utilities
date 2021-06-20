locals {
  app_name = "soccer"
  env_name = "prod"
  name = "${local.env_name}-${local.app_name}"
  location = "Central US"
  resource_group_name = "rg-${local.name}"
}


module "api" {
  source = "../../modules/azure_function"

  name = "${local.name}-api"
  location = local.location
  resource_group_name = local.resource_group_name
}

module "site" {
  source = "../../modules/azure_static_site"

  name = "${local.name}-site"
  location = local.location
  resource_group_name = local.resource_group_name
  audience = module.api.api_identifier
  site_directory = "${path.cwd}/../../../../dist/apps/web-ui"
}
