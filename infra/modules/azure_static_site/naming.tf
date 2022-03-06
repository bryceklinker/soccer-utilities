resource "azurecaf_name" "site" {
  name          = "${var.env_name}-${var.app_name}-${var.service_name}"
  random_length = 4
  clean_input   = true

  resource_types = [
    "azurerm_resource_group",
    "azurerm_application_insights"
  ]
}
