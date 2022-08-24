
resource "aws_cloudwatch_log_group" "log_resolve_expeditions" {
  name              = "/aws/lambda/${aws_lambda_function.rate_limiter.function_name}"
  retention_in_days = 30
}
