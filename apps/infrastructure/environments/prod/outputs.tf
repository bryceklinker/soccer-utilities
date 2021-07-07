output "function_app_url" {
  value = module.api.function_app_url
}

output "web_site_url" {
  value = "https://${module.site.site_url}"
}
