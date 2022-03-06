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
  env_name       = "prod"
  app_name       = "soccer-utilities"
  dist_directory = "${path.cwd}/../../../../dist"

  tags = {}
}

module "platform" {
  source = "../../modules/platform"

  env_name = local.env_name
  app_name = local.app_name
  tags     = local.tags
}

module "api" {
  source = "../../modules/azure_function"

  app_name                     = local.app_name
  env_name                     = local.env_name
  location                     = module.platform.location
  app_service_plan_id          = module.platform.func_app_service_plan_id
  cosmosdb_account_name        = module.platform.cosmosdb_account_name
  cosmosdb_endpoint            = module.platform.cosmosdb_endpoint
  cosmosdb_primary_key         = module.platform.cosmosdb_primary_key
  cosmosdb_resource_group_name = module.platform.resource_group_name
  storage_account_access_key   = module.platform.storage_account_access_key
  storage_account_name         = module.platform.storage_account_name
  storage_account_sas          = module.platform.storage_account_readonly_sas
  api_directory                = "${local.dist_directory}/apps/rest-api"
  auth0_domain                 = var.auth0_domain
  auth0_client_id              = var.auth0_client_id
  auth0_client_secret          = var.auth0_client_secret
  tags                         = local.tags

  depends_on = [module.platform]
}

module "site" {
  source = "../../modules/azure_static_site"

  app_name                     = local.app_name
  env_name                     = local.env_name
  location                     = module.platform.location
  audience                     = module.api.api_identifier
  site_directory               = "${local.dist_directory}/apps/web-ui"
  api_url                      = module.api.function_app_url
  auth0_domain                 = var.auth0_domain
  storage_account_name         = module.platform.storage_account_name
  storage_account_web_host_url = module.platform.storage_account_web_host_url
  tags                         = local.tags

  depends_on = [module.api, module.platform]
}
