import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";
import { URLSearchParams } from "url";

const GammaProvider = (options: OAuthUserConfig<any>) => {
  return {
    id: "gamma",
    name: "Gamma",
    type: "oauth",
    version: "2.0",
    userinfo: {
      url: "https://gamma.chalmers.it/api/users/me",
    },
    authorization: {
      params: { grant_type: "authorization_code", scope: "" },
      url: "https://gamma.chalmers.it/api/oauth/authorize",
    },
    token: {
      request: async (context) => {
        const query = new URLSearchParams({
          grant_type: "authorization_code",
          code: context.params.code || "",
          redirect_uri: context.provider.callbackUrl,
        }).toString();
        const { clientId, clientSecret } = context.provider;
        const basicAuthToken = new Buffer(
          `${clientId}:${clientSecret}`
        ).toString("base64");
        const result = await fetch(
          `https://gamma.chalmers.it/api/oauth/token?${query}`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${basicAuthToken}`,
            },
          }
        );
        const jsonResult = await result.json();
        const { access_token, expires_in, scope } = jsonResult;
        return {
          tokens: {
            access_token: access_token,
            expires_at: Date.now() + expires_in,
            scope: scope,
          },
        };
      },
    },
    idToken: false,
    async profile(profile) {
      // You can use the tokens, in case you want to fetch more profile information
      // For example several OAuth providers do not return email by default.
      // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
      return {
        id: profile.id,
        // NOTE: den här funktionen körs bara första gången man registrerar sig,
        // så lite oklart hur den funkar om man skulle byta namn
        name: profile.firstName + " " + profile.lastName,
        email: profile.email,
        image: profile.picture,
      };
    },
    clientId: options.clientId,
    clientSecret: options.clientSecret,
  } as OAuthConfig<any>;
};

export default GammaProvider;
