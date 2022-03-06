resource "azurerm_resource_group" "site" {
  location = var.location
  name     = azurecaf_name.site.results["azurerm_resource_group"]
}

resource "azurerm_application_insights" "site" {
  location            = azurerm_resource_group.site.location
  name                = azurecaf_name.site.results["azurerm_application_insights"]
  resource_group_name = azurerm_resource_group.site.name
  application_type    = "other"
  workspace_id        = var.log_analytics_workspace_id

  tags = var.tags
}

module "site_files" {
  source = "hashicorp/dir/template"

  base_dir = var.site_directory
}

resource "azurerm_storage_blob" "site_content" {
  for_each = module.site_files.files

  storage_account_name   = var.storage_account_name
  storage_container_name = "$web"

  name         = each.key
  source       = each.value.source_path
  content_type = each.value.content_type
  content_md5  = each.value.digests.md5
  type         = "Block"
}

resource "azurerm_storage_blob" "site_settings" {
  storage_account_name   = var.storage_account_name
  storage_container_name = "$web"

  name           = "assets/settings.json"
  content_type   = "text/json"
  source_content = jsonencode({
    "api" : {
      "url" : var.api_url
    },
    "auth" : {
      "domain" : var.auth0_domain
      "clientId" : auth0_client.site.client_id,
      "audience" : var.audience
    },
    "logging" : {
      "instrumentationKey" : azurerm_application_insights.site.instrumentation_key
    }
  })
  type = "Block"
}

resource "auth0_client" "site" {
  name                       = "${var.env_name} ${var.app_name} client"
  oidc_conformant            = true
  app_type                   = "spa"
  is_first_party             = true
  token_endpoint_auth_method = "none"

  grant_types = [
    "password",
    "authorization_code",
    "refresh_token"
  ]

  allowed_origins = [
    var.storage_account_web_host_url,
    "http://localhost:4200"
  ]

  callbacks = [
    var.storage_account_web_host_url,
    "http://localhost:4200"
  ]

  allowed_logout_urls = [
    var.storage_account_web_host_url,
    "http://localhost:4200"
  ]

  web_origins = [
    var.storage_account_web_host_url,
    "http://localhost:4200"
  ]
}
