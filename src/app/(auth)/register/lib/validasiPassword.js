import { passwordRule } from "./passwordRule";

export function validatePassword(password) {
  const errors = [];

  if (password.length < passwordRule.minLength) {
    errors.push("Minimal 8 karakter");
  }

  if (!passwordRule.lowercase.test(password)) {
    errors.push("Harus mengandung huruf kecil");
  }

  if (!passwordRule.uppercase.test(password)) {
    errors.push("Harus mengandung huruf besar");
  }

  if (!passwordRule.number.test(password)) {
    errors.push("Harus mengandung angka");
  }

  if (!passwordRule.special.test(password)) {
    errors.push("Harus mengandung karakter spesial");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
