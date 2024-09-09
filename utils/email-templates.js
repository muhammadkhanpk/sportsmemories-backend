export const sendOTPEmail = (
 {
    name,
    otp,
    isResetPassword
 }
) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="eng">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta content="telephone=no" name="format-detection" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap"
      rel="stylesheet"
    />

    <title>Sports Memories</title>
  </head>
  <body
    bgcolor="#f8f8fc"
    style="margin: 0; font-family: 'Lato', Arial, sans-serif"
  >
    <table
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      style="background-color: #f8f8fc"
    >
      <tr>
        <td align="center">
          <table
            width="544"
            border="0"
            cellpadding="0"
            cellspacing="0"
            style="
              background-color: #f8f8fc;
              max-width: 800px;
              margin: 0 auto;
              overflow: hidden;
              border: 1px solid #f8f8fc;
            "
          >
            <tr>
              <td style="background-color: #161924; padding: 28px">
                <table
                  width="100%"
                  align="left"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                >
                  <tr>
                    <td align="left">
                      Sports Memories App
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td
                style="
                  background-color: #fff;
                  padding: 0px 32px 0px;
                  border-radius: 8px;
                  border-bottom-left-radius: 0;
                  border-bottom-right-radius: 0;
                "
              >
                <table align="left" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td
                      align="left"
                      colspan="4"
                      style="padding-top: 32px; padding-bottom: 24px"
                    >
                      <img
                        width="64"
                        src="https://imgur.com/u7YOYOT.png"
                        alt="Welcome"
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td
                style="
                  background-color: #fff;
                  padding: 0 32px 32px;
                  border-radius: 8px;
                  border-top-left-radius: 0;
                  border-top-right-radius: 0;
                "
              >
                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td>
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        width="544"
                        align="center"
                      >
                        <tr>
                          <td>
                            <table cellpadding="0" cellspacing="0" width="544">
                              <tr>
                                <td
                                  style="
                                    color: #151a26;
                                    font-family: 'Lato', Arial, sans-serif;
                                    font-size: 24px;
                                    font-style: normal;
                                    font-weight: 700;
                                    line-height: 28px;
                                    padding: 0px 0 24px;
                                  "
                                  width="545"
                                >
                                ${!isResetPassword ? 'Verify Email Address' : 'Reset Password OTP' }
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style="
                                    color: #5e718d;
                                    font-family: 'Lato', Arial, sans-serif;
                                    font-size: 16px;
                                    font-style: normal;
                                    font-weight: 400;
                                    line-height: 20px;
                                    padding: 0px 0 24px;
                                  "
                                  width="545"
                                >
                                  <span
                                    style="display: block; padding-bottom: 24px"
                                    >Dear ${name},</span
                                  >
                                  <p style="margin: 0">
                                  ${!isResetPassword ? 'Welcome to Sports Memories App! 🎉 To get started' : 'Your Reset Password OTP is expired after 30 minutes'}
                                    , Verify your OTP: ${otp}
                                  </p>
                                </td>
                              </tr>
                              
                              <tr>
                                <td
                                  style="
                                    color: #5e718d;
                                    font-family: 'Lato', Arial, sans-serif;
                                    font-size: 16px;
                                    font-style: normal;
                                    font-weight: 400;
                                    line-height: 20px;
                                    padding: 0px 0 4px;
                                  "
                                  width="545"
                                >
                                  Thanks,
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style="
                                    color: #5e718d;
                                    font-family: 'Lato', Arial, sans-serif;
                                    font-size: 16px;
                                    font-style: normal;
                                    font-weight: 400;
                                    line-height: 20px;
                                    padding: 0px 0 24px;
                                  "
                                  width="545"
                                >
                                Sports Memories App Team
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td
                style="
                  color: #151a26;
                  font-family: 'Lato', Arial, sans-serif;
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 20px;
                  padding-top: 24px;
                "
                width="544"
              >
                If you didn't make this request, just ignore this email.
                <br />
                Need help? Reach out to
                <a href="mailto:abc@gmail.com" style="color: #2969ff; text-decoration: none"
                  >abc@gmail.com</a
                >
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

