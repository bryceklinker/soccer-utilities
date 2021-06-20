terraform {
  required_providers {
    azurerm = {
      source = "hasicorp/azurerm"
      version = ">= 2.64.0"
    }

    auth0 = {
      source = "alexkapa/auth0"
      version = ">= 0.21.0"
    }
  }
}

provider "azurerm" {
  features {}
}

provider "auth0" {

}
