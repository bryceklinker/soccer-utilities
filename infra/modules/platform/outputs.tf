output "log_analytics_workspace_id" {
  value = azurerm_log_analytics_workspace.platform.id
}

output "location" {
  value = azurerm_resource_group.platform.location
}

output "func_app_service_plan_id" {
  value = azurerm_app_service_plan.platform_func.id
}

output "storage_account_name" {
  value = azurerm_storage_account.platform.name
}

output "storage_account_access_key" {
  value = azurerm_storage_account.platform.primary_access_key
}

output "storage_account_web_host_url" {
  value = "https://${azurerm_storage_account.platform.primary_web_host}"
}

output "storage_account_readonly_sas" {
  value = data.azurerm_storage_account_sas.platform.sas
}

output "resource_group_name" {
  value = azurerm_resource_group.platform.name
}

output "cosmosdb_account_name" {
  value = azurerm_cosmosdb_account.platform.name
}

output "cosmosdb_endpoint" {
  value = azurerm_cosmosdb_account.platform.endpoint
}

output "cosmosdb_primary_key" {
  value = azurerm_cosmosdb_account.platform.primary_master_key
}
