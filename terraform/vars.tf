variable "aws_region" {
  description = "AWS region for all resources."
  type        = string
  default     = "eu-west-3"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "rate-limiter-lambda"
}

variable "project_prefix" {
  description = "Project prefix"
  type        = string
  default     = "rll"
}

variable "lambda_runtime" {
  description = "Identifier of the function's runtime."
  type        = string
  default     = "nodejs16.x"
}

variable "lambda_timeout" {
  description = "Amount of time your Lambda Function has to run in seconds. Defaults to 3."
  type        = number
  default     = 3
}

variable "lambda_memory" {
  description = "Amount of memory in MB your Lambda Function can use at runtime. Defaults to 128."
  type        = number
  default     = 128
}

variable "env_remote_url" {
  description = "The remote url that will be injected as environment variable"
  type        = string
}
