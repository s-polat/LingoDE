import { getAuth } from 'firebase-admin/auth';

const allowedEmails = (process.env.ALLOWED_EMAILS || '').split(',').map(e => e.trim().toLowerCase());

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Giriş yapman gerekiyor.' });
  }

  try {
    const token = header.slice(7);
    const decoded = await getAuth().verifyIdToken(token);
    const email = decoded.email?.toLowerCase();

    if (!allowedEmails.includes(email)) {
      return res.status(403).json({ success: false, message: 'Bu hesabın erişim izni yok.' });
    }

    req.user = { uid: decoded.uid, email };
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Geçersiz oturum. Tekrar giriş yap.' });
  }
}
