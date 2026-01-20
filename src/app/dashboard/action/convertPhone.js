export function convertPhone(phone) {
  if (!phone) return "";

  if (phone.startsWith("0")) {
    return "+62" + phone.slice(1);
  }

  return phone;
}
