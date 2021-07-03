data "archive_file" "function_code" {
  type = "zip"
  source_dir = var.api_directory
  output_path = "${path.module}/functions/${var.name}.zip"
}

data "azurerm_storage_account_sas" "function_app_sas" {
  connection_string = azurerm_storage_account.function_app_storage.primary_connection_string
  https_only = true
  start = "2021-06-20"
  expiry = "2021-09-20"


  resource_types {
    container = false
    object = true
    service = false
  }

  permissions {
    add = false
    create = false
    delete = false
    list = false
    process = false
    read = true
    update = false
    write = false
  }

  services {
    blob = true
    file = false
    queue = false
    table = false
  }
}

resource "azurerm_storage_account" "function_app_storage" {
  name = "st${replace(var.name, "-", "")}"
  location = var.location
  resource_group_name = var.resource_group_name

  account_replication_type = "LRS"
  account_tier = "Standard"

  tags = var.tags
}

resource "azurerm_storage_container" "function_assets" {
  name = "assets"
  storage_account_name = azurerm_storage_account.function_app_storage.name
  container_access_type = "private"
}

resource "azurerm_storage_blob" "function_blob" {
  name = "${var.name}-${data.archive_file.function_code.output_md5}.zip"
  storage_account_name = azurerm_storage_account.function_app_storage.name
  storage_container_name = azurerm_storage_container.function_assets.name
  source = data.archive_file.function_code.output_path

  type = "Block"
  content_type = "application/octet-stream"
}

resource "azurerm_app_service_plan" "function_app_plan" {
  location = var.location
  name = "plan-${var.name}"
  resource_group_name = var.resource_group_name
  kind = "FunctionApp"
  reserved = true

  sku {
    size = "Y1"
    tier = "Dynamic"
  }

  tags = var.tags
}

resource "azurerm_application_insights" "function_app_insights" {
  location = var.location
  name = "appi-${var.name}"
  resource_group_name = var.resource_group_name
  application_type = "Node.JS"

  tags = var.tags
}

resource "azurerm_function_app" "function_app" {
  name = "func-${var.name}"
  location = var.location
  resource_group_name = var.resource_group_name

  https_only = true
  app_service_plan_id = azurerm_app_service_plan.function_app_plan.id
  storage_account_name = azurerm_storage_account.function_app_storage.name
  storage_account_access_key = azurerm_storage_account.function_app_storage.primary_access_key
  os_type = "linux"

  tags = var.tags
  version = "~3"

  site_config {
    linux_fx_version = "node|14"
    use_32_bit_worker_process = false
  }

  app_settings = {
    // Runtime Variables
    FUNCTIONS_WORKER_RUNTIME = "node"
    HASH = data.archive_file.function_code.output_md5
    WEBSITE_RUN_FROM_PACKAGE = "https://${azurerm_storage_account.function_app_storage.name}.blob.core.windows.net/${azurerm_storage_container.function_assets.name}/${azurerm_storage_blob.function_blob.name}${data.azurerm_storage_account_sas.function_app_sas.sas}"
    APPINSIGHTS_INSTRUMENTATIONKEY = azurerm_application_insights.function_app_insights.instrumentation_key

    // Application Environment Variables
    ISSUER_URL = "https://${var.auth0_domain}/"
    AUDIENCE = auth0_resource_server.rest_api_server.identifier
    IS_AZURE_FUNCTION = true
  }
}

resource "auth0_resource_server" "rest_api_server" {
  name = "${var.name} Api"
  identifier = "https://${var.name}.com"
  allow_offline_access = true
  skip_consent_for_verifiable_first_party_clients = true
}

resource "azurerm_cosmosdb_account" "rest_api_cosmos_account" {
  location = var.location
  name = "cosmos-${var.name}"
  resource_group_name = var.resource_group_name
  offer_type = "Standard"
  enable_free_tier = true
  kind = "GlobalDocumentDB"

  consistency_policy {
    consistency_level = "Eventual"
  }
  geo_location {
    failover_priority = 0
    location = var.location
  }
}

resource "azurerm_cosmosdb_sql_database" "bsc_database" {
  account_name = azurerm_cosmosdb_account.rest_api_cosmos_account.name
  resource_group_name = var.resource_group_name
  name = "bsc"
}

resource "azurerm_cosmosdb_sql_container" "entities_container" {
  account_name = azurerm_cosmosdb_account.rest_api_cosmos_account.name
  database_name = azurerm_cosmosdb_sql_database.bsc_database.name
  resource_group_name = var.resource_group_name
  name = "entities"
  partition_key_path = "/type"
  throughput = 400
}
