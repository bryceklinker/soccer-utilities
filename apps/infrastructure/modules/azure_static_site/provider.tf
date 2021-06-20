terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "2.64.0"
    }

    auth0 = {
      source = "alexkappa/auth0"
      version = "0.21.0"
    }
  }
}
