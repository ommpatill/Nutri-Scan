exports.validateSignup = ({ name, age, bloodGroup, email, password }) => {
    if (!name || !age || !bloodGroup || !email || !password) {
      return "All fields are required.";
    }
  
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "Invalid email format.";
    }
  
    if (password.length < 3) {
      return "Password must be at least 6 characters.";
    }
  
    if (age < 1 || age > 120) {
      return "Please enter a valid age.";
    }
  
    return null;
  };
  
  exports.validatePasswordReset = ({ email, otp, newPassword }) => {
    if (!email || !otp || !newPassword) {
      return "All fields are required.";
    }
  
    if (newPassword.length < 3) {
      return "New password must be at least 3 characters.";
    }
  
    return null;
  };
  