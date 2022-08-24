terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.27"
    }
  }
  required_version = ">= 1.2.7"
}

provider "aws" {
  region = var.aws_region
}
