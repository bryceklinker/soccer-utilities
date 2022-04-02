output "function_app_url" {
  value = module.api.function_app_url
}

output "auth0_api_identifier" {
  value = module.api.api_identifier
}

output "web_site_url" {
  value = module.site.site_url
}

output "automation_client_id" {
  value = module.site.automation_client_id
}

output "automation_client_secret" {
  value = module.site.automation_client_secret
}
