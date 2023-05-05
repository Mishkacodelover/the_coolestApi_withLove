import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

const LoginDTOSchema = Type.Object(
  {
    email: Type.String({
      format: "email",
      errorMessage: {
        type: "Email type must be a string",
        format: "Please enter a valid email address",
      },
    }),
    password: Type.String({
      errorMessage: {
        type: "Password must be a string",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      type: "Must be an object",
      additionalProperties: "Object format is not valid",
      required: {
        email: "Email is required",
        password: "Password is required",
      },
    },
  }
);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ["email"]);
addErrors(ajv, { keepErrors: false });

const validate = ajv.compile(LoginDTOSchema);

const validateLogin = (req, res, next) => {
  const isDTOValid = validate(req.body);
  if (!isDTOValid)
    return res
      .status(400)
      .send(ajv.errorsText(validate.errors, { separator: "\n" }));
  next();
};

export default validateLogin;
