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
  description = "The identifier of the aws lambda runtime"
  type        = string
  default     = "nodejs16.x"
}
