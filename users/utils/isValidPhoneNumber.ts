function isValidPhoneNumber(phoneNumber: string): boolean {
  return /^01\d{9}$/.test(phoneNumber)
}

export default isValidPhoneNumber