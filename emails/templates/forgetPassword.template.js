exports.forgotPasswordTemplate = (resetLink) => {
  return `
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Reset Password</title>
  </head>

  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, Helvetica, sans-serif;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="padding: 40px 0"
    >
      <tr>
        <td align="center">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background-color: #ffffff;
              border-radius: 12px;
              padding: 40px;
            "
          >
            <tr>
              <td align="center">
                <h1
                  style="
                    margin: 0;
                    font-size: 32px;
                    letter-spacing: 4px;
                    color: #111111;
                  "
                >
                  ZENVY
                </h1>
              </td>
            </tr>

        <tr>
          <td height="30"></td>
        </tr>

        <tr>
          <td>
            <h2
              style="
                margin: 0 0 15px 0;
                color: #111111;
                font-size: 24px;
              "
            >
              Reset Your Password
            </h2>

            <p
              style="
                margin: 0;
                color: #555555;
                font-size: 16px;
                line-height: 1.6;
              "
            >
              We received a request to reset your Zenvy account password.
              Click the button below to continue.
            </p>
          </td>
        </tr>

        <tr>
          <td height="35"></td>
        </tr>

        <!-- Button -->
        <tr>
          <td align="center">
            <a
              href="${resetLink}"
              style="
                background-color: #111111;
                color: #ffffff;
                text-decoration: none;
                padding: 14px 32px;
                border-radius: 8px;
                font-size: 16px;
                display: inline-block;
                font-weight: bold;
                cursor: pointer;
              "
            >
              Reset Password
            </a>
          </td>
        </tr>

        <!-- Spacer -->
        <tr>
          <td height="35"></td>
        </tr>

        <!-- Extra Info -->
        <tr>
          <td>
            <p
              style="
                margin: 0;
                color: #777777;
                font-size: 14px;
                line-height: 1.6;
              "
            >
              This link will expire in 15 minutes for security reasons.
            </p>

            <p
              style="
                margin-top: 16px;
                color: #777777;
                font-size: 14px;
                line-height: 1.6;
              "
            >
              If you did not request a password reset, you can safely ignore
              this email.
            </p>
          </td>
        </tr>

        <!-- Spacer -->
        <tr>
          <td height="40"></td>
        </tr>

        <!-- Footer -->
        <tr>
          <td
            style="
              border-top: 1px solid #eeeeee;
              padding-top: 20px;
              text-align: center;
            "
          >
            <p
              style="
                margin: 0;
                color: #999999;
                font-size: 13px;
              "
            >
              © 2026 Zenvy. All rights reserved.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
  </body>
</html>
`;
};
