// Import Third-party Dependencies
import { S } from "fluent-json-schema";

export const authenticate = {
  body: S.object()
    .title("Authenticate body")
    .description("Payload to authenticate a user")
    .prop("email", S.string().format(S.FORMATS.EMAIL).required())
    .prop("password", S.string().minLength(8).required())
    .valueOf()
};
