import { env } from "@/envConfig";
import { sendVerificationRequest } from "@/external/email/send-verification-request";
import { prisma } from "@/prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";

export const authOptions: AuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  theme: {
    brandColor: "oklch(0.56 0.24 260.92)",
    buttonText: "oklch(0.93 0.01 261.82)",
  },
  pages: {
    signIn: "/auth/entrar",
    verifyRequest: "/auth/verificar",
    error: "/auth/erro",
  },
  providers: [
    CredentialsProvider({
      name: "Usuário e Senha",
      credentials: {
        username: {
          label: "Nome de usuário",
          type: "text",
          placeholder: "jsmith",
        },
        password: {
          label: "Senha",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            username: credentials.username,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
    EmailProvider({
      server: {
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        auth: {
          user: env.SMTP_USERNAME,
          pass: env.SMTP_PASSWORD,
        },
      },
      from: env.SMTP_FROM_EMAIL,
      maxAge: 15 * 60,
      sendVerificationRequest,
    }),
  ],
};

console.log(env);

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
