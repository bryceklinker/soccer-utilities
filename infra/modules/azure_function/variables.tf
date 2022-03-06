variable "app_name" {
  type = string
}

variable "env_name" {
  type = string
}

variable "service_name" {
  type    = string
  default = "api"
}

variable "location" {
  type = string
}

variable "storage_account_name" {
  type = string
}

variable "storage_account_sas" {
  type = string
}

variable "storage_account_access_key" {
  type = string
}

variable "cosmosdb_resource_group_name" {
  type = string
}

variable "cosmosdb_account_name" {
  type = string
}

variable "cosmosdb_endpoint" {
  type = string
}

variable "cosmosdb_primary_key" {
  type = string
}

variable "app_service_plan_id" {
  type = string
}

variable "api_directory" {
  type = string
}

variable "log_analytics_workspace_id" {
  type = string
}

variable "auth0_domain" {
  type = string
}

variable "auth0_client_id" {
  type = string
}

variable "auth0_client_secret" {
  type = string
}

variable "tags" {
  type    = map(string)
  default = {}
}

locals {
  name = "${var.env_name}-${var.app_name}"
  tags = merge({
    environment = var.env_name
    service     = var.service_name
    application = var.app_name
  }, var.tags)
}
