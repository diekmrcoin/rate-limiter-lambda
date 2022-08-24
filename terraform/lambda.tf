resource "aws_lambda_function" "rate_limiter" {
  function_name    = "${var.project_prefix}-rate-limiter"
  role             = aws_iam_role.rate_limiter.arn
  handler          = "main.handler"
  runtime          = var.lambda_runtime
  filename         = "../dist/artifacts/main.zip"
  source_code_hash = filebase64sha256("../dist/artifacts/main.zip")
  memory_size = 128
  timeout = 3
  environment {
    variables = {
      REMOTE_URL = var.env_remote_url
    }
  }
}

resource "aws_lambda_function_url" "rate_limiter" {
  function_name      = aws_lambda_function.rate_limiter.function_name
  authorization_type = "NONE"
  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["POST"]
    allow_headers     = ["date", "keep-alive"]
    expose_headers    = ["keep-alive", "date"]
    max_age           = 86400
  }
}
