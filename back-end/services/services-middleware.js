function authMiddleware(req, res, next) {
    if (!req.session.user) {
        return res.status(401).send('forbidden');
    }
    next();
}
module.exports={ authMiddleware }