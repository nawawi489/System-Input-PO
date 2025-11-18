export default function handler(req, res) {
  res.status(200).json({
    user: process.env.ADMIN_USER,
    pass: process.env.ADMIN_PASS
  });
}
