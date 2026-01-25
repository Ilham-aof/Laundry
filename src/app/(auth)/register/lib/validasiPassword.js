import { passwordRule } from "./passwordRule";

export function validatePassword(password) {
  let score = 0;

  if (password.length >= passwordRule.minLength) score++;
  if (passwordRule.lowercase.test(password)) score++;
  if (passwordRule.uppercase.test(password)) score++;
  if (passwordRule.number.test(password)) score++;
  if (passwordRule.special.test(password)) score++;

  let strength = "weak";
  let progress = 0;

  if (score <= 2) {
    strength = "weak";
    progress = 33;
  } else if (score <= 4) {
    strength = "medium";
    progress = 66;
  } else {
    strength = "strong";
    progress = 100;
  }

  return {
    score,
    strength, // weak | medium | strong
    progress, // 33 | 66 | 100
    isValid: strength === "strong",
  };
}
