import { z } from "zod";

// 회원가입 스키마
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "이름은 최소 2자 이상이어야 합니다")
      .max(50, "이름은 최대 50자까지 입력 가능합니다"),
    email: z.string().email("올바른 이메일 형식을 입력해주세요"),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)/,
        "비밀번호는 영문자와 숫자를 포함해야 합니다"
      ),
    confirmPassword: z.string(),
    role: z.enum(["user", "admin", "editor"], {
      error: "역할을 선택해주세요",
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "이용약관에 동의해야 합니다",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

// 로그인 스키마
export const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식을 입력해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

// 타입 자동 생성
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
