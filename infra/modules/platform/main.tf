resource "azurerm_resource_group" "platform" {
  location = var.location
  name     = azurecaf_name.default.results["azurerm_resource_group"]
  tags     = local.tags
}

resource "azurerm_log_analytics_workspace" "platform" {
  location            = azurerm_resource_group.platform.location
  name                = azurecaf_name.default.results["azurerm_log_analytics_workspace"]
  resource_group_name = azurerm_resource_group.platform.name
  tags                = local.tags
}

resource "azurerm_cosmosdb_account" "platform" {
  location            = azurerm_resource_group.platform.location
  name                = azurecaf_name.default.results["azurerm_cosmosdb_account"]
  offer_type          = "Standard"
  resource_group_name = azurerm_resource_group.platform.name
  enable_free_tier    = true
  kind                = "GlobalDocumentDB"
  tags                = local.tags

  consistency_policy {
    consistency_level = "Eventual"
  }

  geo_location {
    failover_priority = 0
    location          = azurerm_resource_group.platform.location
  }
}

resource "azurerm_storage_account" "platform" {
  account_replication_type  = "LRS"
  account_tier              = "Standard"
  location                  = azurerm_resource_group.platform.location
  name                      = azurecaf_name.storage.results["azurerm_storage_account"]
  resource_group_name       = azurerm_resource_group.platform.name
  enable_https_traffic_only = true
  tags                      = local.tags

  static_website {
    index_document     = "index.html"
    error_404_document = "index.html"
  }
}

resource "azurerm_app_service_plan" "platform_func" {
  location            = azurerm_resource_group.platform.location
  name                = azurecaf_name.default.results["azurerm_app_service_plan"]
  resource_group_name = azurerm_resource_group.platform.name
  tags                = local.tags
  kind                = "functionapp"
  reserved            = true

  sku {
    size = "Y1"
    tier = "Dynamic"
  }
}

data "azurerm_storage_account_sas" "platform" {
  connection_string = azurerm_storage_account.platform.primary_connection_string
  https_only        = true
  start             = "2021-06-20"
  expiry            = "9999-12-31T23:59:59Z"

  resource_types {
    container = false
    object    = true
    service   = false
  }

  permissions {
    add     = false
    create  = false
    delete  = false
    list    = false
    process = false
    read    = true
    update  = false
    write   = false
  }

  services {
    blob  = true
    file  = false
    queue = false
    table = false
  }
}



