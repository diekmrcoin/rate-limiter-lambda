output "rate_limiter_function_url" {
  description = "A function URL is a dedicated HTTP(S) endpoint for a Lambda function"
  value = aws_lambda_function_url.rate_limiter.function_url
}
