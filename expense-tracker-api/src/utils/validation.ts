import * as z from "zod";
import { loginUserDTO, registerUserDTO } from "../types/AuthDTO";
import { error } from "console";

const registerValidations = z.object({
  name: z
    .string()
    .min(2, {
      error: (inp) => `Name must have ${inp.minimum} charchters !!!`,
    })
    .max(50, {
      error: (inp) => `Name not have more than ${inp.maximum} charchters !!!`,
    })
    .trim(),
  email: z
    .email({
      error: (inp) =>
        inp.input == ""
          ? "Email Field is required !!!"
          : "Invalid Email address",
    })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(6, "Password length is too Short !!!")
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /\d/.test(val), {
      message: "Password must contain at least one number",
    })
    .refine((val) => /[@$!%*?&]/.test(val), {
      message: "Password must contain at least one special character (@$!%*?&)",
    })
    .trim(),
  currency: z.enum(["INR", "USD"]).default("INR").nullable(),
});

const loginValidation = z.object({
  email: z
    .email({
      error: (inp) =>
        inp.input == ""
          ? "Email Field is required !!!"
          : "Invalid Email address",
    })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(6, "Password length is too Short !!!")
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /\d/.test(val), {
      message: "Password must contain at least one number",
    })
    .refine((val) => /[@$!%*?&]/.test(val), {
      message: "Password must contain at least one special character (@$!%*?&)",
    })
    .trim(),
});
export const validateUserAtRegistration = (data: registerUserDTO) => {
  try {
    const isParsed = registerValidations.parse(data);
    return isParsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        errors: error.issues.map((e: any) => {
          return e.message;
        }),
      };
    }
  }
};

export const validateUserAtLogin = (data: loginUserDTO) => {
  try {
    const isParsed = loginValidation.parse(data);
    return isParsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        errors: error.issues.map((e: any) => {
          return e.message;
        }),
      };
    }
  }
};
