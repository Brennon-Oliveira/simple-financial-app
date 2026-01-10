import { Theme } from "next-auth";
import { SendVerificationRequestParams } from "next-auth/providers/email";
import { createTransport } from "nodemailer";

export async function sendVerificationRequest({
  identifier,
  url,
  provider,
  theme,
}: SendVerificationRequestParams) {
  const { host } = new URL(url);

  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Requesição de acesso ${host}`,
    text: text({ url, host }),
    html: html({ url, host, theme }),
  });
  const failed = result.rejected.concat(result.rejected).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

function html({
  url,
  host,
  theme,
}: {
  url: string;
  host: string;
  theme: Theme;
}) {
  const escapedHost = host.replace(/\./g, "&#8203;.");

  const brandColor = theme.brandColor || "oklch(0.56 0.24 260.92)";
  const color = {
    background: "oklch(0.26 0.03 262.67)",
    text: "oklch(0.93 0.01 261.82)",
    mainBackground: "oklch(0.3 0.03 260.51)",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "oklch(0.93 0.01 261.82)",
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; margin: auto; margin-top: 100px; max-width: 600px; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Solicitação de acesso para <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px; background: ${color.buttonBackground};"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Entrar</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Caso não tenha solicitado acesso, por favor, ignore esse email.
      </td>
    </tr>
  </table>
</body>
`;
}

function text({ url, host }: { url: string; host: string }) {
  return `Acesso solicitado para ${host}\n${url}\n\n`;
}
