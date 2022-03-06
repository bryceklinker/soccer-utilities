data "archive_file" "function_code" {
  type        = "zip"
  source_dir  = var.api_directory
  output_path = "${path.module}/functions/${local.name}.zip"
}

resource "azurerm_resource_group" "function" {
  location = var.location
  name     = azurecaf_name.function.results["azurerm_resource_group"]
  tags     = local.tags
}

resource "azurerm_storage_container" "function_assets" {
  name                  = "assets"
  storage_account_name  = var.storage_account_name
  container_access_type = "private"
}

resource "azurerm_storage_blob" "function_blob" {
  name                   = "${local.name}-${data.archive_file.function_code.output_md5}.zip"
  storage_account_name   = var.storage_account_name
  storage_container_name = azurerm_storage_container.function_assets.name
  source                 = data.archive_file.function_code.output_path
  type                   = "Block"
  content_type           = "application/octet-stream"
}

resource "azurerm_application_insights" "function_app_insights" {
  location            = azurerm_resource_group.function.location
  name                = azurecaf_name.function.results["azurerm_application_insights"]
  resource_group_name = azurerm_resource_group.function.name
  application_type    = "Node.JS"

  tags = local.tags
}

resource "azurerm_function_app" "function_app" {
  name                = azurecaf_name.function.results["azurerm_function_app"]
  location            = azurerm_resource_group.function.location
  resource_group_name = azurerm_resource_group.function.name


  https_only                 = true
  app_service_plan_id        = var.app_service_plan_id
  storage_account_name       = var.storage_account_name
  storage_account_access_key = var.storage_account_access_key
  os_type                    = "linux"

  tags    = local.tags
  version = "~3"

  site_config {
    linux_fx_version          = "node|14"
    use_32_bit_worker_process = false

    cors {
      allowed_origins = ["*"]
    }
  }

  app_settings = {
    // Runtime Variables
    FUNCTIONS_WORKER_RUNTIME       = "node"
    HASH                           = data.archive_file.function_code.output_md5
    WEBSITE_RUN_FROM_PACKAGE       = "https://${var.storage_account_name}.blob.core.windows.net/${azurerm_storage_container.function_assets.name}/${azurerm_storage_blob.function_blob.name}${var.storage_account_sas}"
    APPINSIGHTS_INSTRUMENTATIONKEY = azurerm_application_insights.function_app_insights.instrumentation_key

    // Application Environment Variables
    AUTH0_DOMAIN        = var.auth0_domain
    AUTH0_CLIENT_ID     = var.auth0_client_id
    AUTH0_CLIENT_SECRET = var.auth0_client_secret
    ISSUER_URL          = "https://${var.auth0_domain}/"
    AUDIENCE            = auth0_resource_server.rest_api_server.identifier
    IS_AZURE_FUNCTION   = true
    COSMOS_ENDPOINT     = var.cosmosdb_endpoint
    COSMOS_KEY          = var.cosmosdb_primary_key
  }
}

resource "auth0_resource_server" "rest_api_server" {
  name                                            = "${var.env_name} ${var.app_name} api"
  identifier                                      = "https://${local.name}.com"
  allow_offline_access                            = true
  skip_consent_for_verifiable_first_party_clients = true
}

resource "azurerm_cosmosdb_sql_database" "bsc_database" {
  account_name        = var.cosmosdb_account_name
  resource_group_name = var.cosmosdb_resource_group_name
  name                = "bsc"
}

resource "azurerm_cosmosdb_sql_container" "entities_container" {
  account_name        = var.cosmosdb_account_name
  database_name       = azurerm_cosmosdb_sql_database.bsc_database.name
  resource_group_name = var.cosmosdb_resource_group_name
  name                = "entities"
  partition_key_path  = "/type"
  throughput          = 400
}
