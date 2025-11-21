export default function esAdmin(req, res, next) {
  if (req.user && req.user.rol === 'Administrador') {
    return next();
  }
  return res.status(403).render('error', { mensaje: 'Solo administradores pueden realizar esta acción' });
}
