resource "azurerm_storage_account" "function_app_storage" {
  name = "st${replace(var.name, "-", "")}"
  location = var.location
  resource_group_name = var.resource_group_name

  account_replication_type = "LRS"
  account_tier = "Standard"

  tags = var.tags
}

resource "azurerm_app_service_plan" "function_app_plan" {
  location = var.location
  name = "plan-${var.name}"
  resource_group_name = var.resource_group_name
  kind = "FunctionApp"

  sku {
    size = "Dynamic"
    tier = "Y1"
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

  tags = var.tags

  app_settings = {
    FUNCTIONS_WORKER_RUNTIME = "node"
    WEBSITE_NODE_DEFAULT_VERSION = "~14"
    APPINSIGHTS_INSTRUMENTATIONKEY = azurerm_application_insights.function_app_insights.instrumentation_key
  }
}

resource "auth0_resource_server" "rest_api_server" {
  name = "${var.name} Api"
  identifier = "https://${var.name}.com"
  allow_offline_access = true
  skip_consent_for_verifiable_first_party_clients = true
}
