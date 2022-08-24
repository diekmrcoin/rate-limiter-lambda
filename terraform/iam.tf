resource "aws_iam_role" "rate_limiter" {
  name               = "rate_limiter"
  assume_role_policy = data.aws_iam_policy_document.rate_limiter.json
}

data "aws_iam_policy_document" "rate_limiter" {
  statement {
    sid = 1
    actions = [
      "sts:AssumeRole"
    ]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.rate_limiter.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
