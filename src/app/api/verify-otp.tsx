export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).end();
    }
  
    const { email, otp } = req.body;
  
    // Find the user by email and check the OTP
    const user = await usersCollection.findOne({ email });
  
    if (!user || user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  
    // Update user as verified
    await usersCollection.updateOne({ email }, { $set: { verified: true }, $unset: { otp: "" } });
  
    return res.status(200).json({ success: true });
  }
  