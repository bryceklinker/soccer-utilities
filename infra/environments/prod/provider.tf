terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "2.98.0"
    }

    auth0 = {
      source  = "auth0/auth0"
      version = "0.28.0"
    }

    azurecaf = {
      source  = "aztfmod/azurecaf"
      version = "1.2.14"
    }
  }

  backend "azurerm" {
    resource_group_name  = "terraform-storage"
    storage_account_name = "stklinkerterraformstate"
    container_name       = "soccer"
    key                  = "prod.tfstate"
  }
}


provider "azurerm" {
  features {}
}

provider "auth0" {}

provider "azurecaf" {}
