variable "name" {
  type = string
}

variable "location" {
  type = string
}

variable "resource_group_name" {
  type = string
}

variable "api_directory" {
  type = string
}

variable "tags" {
  type = map(string)
  default = {}
}
