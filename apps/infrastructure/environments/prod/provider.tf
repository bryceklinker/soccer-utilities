terraform {
  required_providers {
    azurerm = {
      source = "hasicorp/azurerm"
      version = "=2.64.0"
    }

    auth0 = {
      source = "alexkapa/auth0"
      version = "=0.21.0"
    }
  }

  backend "azurerm" {
    resource_group_name = "terraform-storage"
    storage_account_name = "stklinkerterraformstate"
    container_name = "soccer"
    key = "prod.tfstate"
  }
}


provider "azurerm" {
  features {}
}

provider "auth0" {}
