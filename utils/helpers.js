const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

export {
  sleep,
  generateOTP
};
