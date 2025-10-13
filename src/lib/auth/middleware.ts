import z from "zod";

export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: unknown; // This allows for additional properties
};

type ValidatedActionFunction<S extends z.ZodType<unknown, unknown>, T> = (
  data: z.infer<S>,
  formData: FormData
) => Promise<T>;

export function validatedAction<S extends z.ZodType<unknown, unknown>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>
) {
  return async (_prevState: ActionState, formData: FormData) => {
    const result = schema.safeParse(Object.fromEntries(formData));

    const formDataObj = Object.fromEntries(formData);

    if (!result.success) {
      return { error: result.error.issues[0].message, ...formDataObj };
    }

    return action(result.data, formData);
  };
}
