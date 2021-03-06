variable "env_name" {
  type = string
}

variable "app_name" {
  type = string
}

variable "service_name" {
  type    = string
  default = "plat"
}

variable "location" {
  type    = string
  default = "centralus"
}

variable "tags" {
  type    = map(string)
  default = {}
}

locals {
  tags = merge({
    environment = var.env_name
    service     = "platform"
    application = var.app_name
  }, var.tags)
}
