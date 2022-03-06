output "function_app_url" {
  value = "https://${azurerm_function_app.function_app.default_hostname}/api"
}

output "api_identifier" {
  value = auth0_resource_server.rest_api_server.identifier
}
