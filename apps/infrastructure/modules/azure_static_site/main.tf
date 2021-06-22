resource "azurerm_storage_account" "site_storage" {
  location = var.location
  name = "st${replace(var.name, "-", "")}"
  resource_group_name = var.resource_group_name

  account_tier = "Standard"
  account_replication_type = "LRS"
  enable_https_traffic_only = true

  static_website {
    index_document = "index.html"
    error_404_document = "index.html"
  }

  tags = var.tags
}

module "site_files" {
  source = "hashicorp/dir/template"

  base_dir = var.site_directory
}

resource "azurerm_storage_blob" "site_content" {
  for_each = module.site_files.files

  storage_account_name = azurerm_storage_account.site_storage.name
  storage_container_name = "$web"

  name = each.key
  source = each.value.source_path
  content_type = each.value.content_type
  type = "Block"
}

resource "azurerm_storage_blob" "settings_json" {
  storage_account_name = azurerm_storage_account.site_storage.name
  storage_container_name = "$web"

  name = "assets/settings.json"
  content_type = "text/json"
  source_content = jsonencode({
    "api": {
      "url": var.api_url
    },
    "auth": {
      "domain": var.auth0_domain
      "clientId": auth0_client.site_client.client_id,
      "audience": var.audience
    }
  })
  type = "Block"
}

resource "auth0_client" "site_client" {
  name = "${var.name} Client"
  oidc_conformant = true
  app_type = "spa"
  is_first_party = true
  token_endpoint_auth_method = "client_secret_post"

  grant_types = [
    "password",
    "authorization_code",
    "refresh_token"
  ]

  allowed_origins = [
    "https://${azurerm_storage_account.site_storage.primary_web_host}",
    "http://localhost:4200"
  ]

  callbacks = [
    "https://${azurerm_storage_account.site_storage.primary_web_host}",
    "http://localhost:4200"
  ]

  allowed_logout_urls = [
    "https://${azurerm_storage_account.site_storage.primary_web_host}",
    "http://localhost:4200"
  ]

  web_origins = [
    "https://${azurerm_storage_account.site_storage.primary_web_host}",
    "http://localhost:4200"
  ]
}
