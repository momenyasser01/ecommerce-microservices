const isValidPassword = (password: string): boolean => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password)
}

export default isValidPassword
