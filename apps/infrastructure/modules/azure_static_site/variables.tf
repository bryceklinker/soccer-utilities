variable "name" {
  type = string
}

variable "location" {
  type = string
}

variable "resource_group_name" {
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

variable "auth0_domain" {
  type = string
}

variable "tags" {
  type = map(string)
  default = {}
}
