variable "env_name" {
  type = string
}

variable "app_name" {
  type = string
}

variable "location" {
  type = string
}

variable "storage_account_name" {
  type = string
}

variable "storage_account_web_host_url" {
  type = string
}

variable "audience" {
  type = string
}

variable "site_directory" {
  type = string
}

variable "api_url" {
  type = string
}

variable "log_analytics_workspace_id" {
  type = string
}

variable "auth0_domain" {
  type = string
}

variable "tags" {
  type    = map(string)
  default = {}
}

locals {
  tags = merge({
    environment = var.env_name
    module      = "site"
    application = var.app_name
  }, var.tags)
}
