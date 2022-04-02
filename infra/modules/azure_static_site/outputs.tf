output "site_url" {
  value = var.storage_account_web_host_url
}

output "automation_client_id" {
  value = auth0_client.automation.client_id
}

output "automation_client_secret" {
  value = auth0_client.automation.client_secret
}
