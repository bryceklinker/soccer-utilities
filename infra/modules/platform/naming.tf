resource "azurecaf_name" "default" {
  name = "${var.env_name}-${var.app_name}"
  resource_types = [
    "azurerm_resource_group",
    "azurerm_log_analytics_workspace",
    "azurerm_cosmosdb_account",
    "azurerm_storage_account",
    "azurerm_app_service_plan"
  ]
  random_length = 4
  clean_input = true
}
