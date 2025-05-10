function authMiddleware(req, res, next) {
    if (!req.session.user) {
        //return res.status(401).send('forbidden');
        return res.redirect('https://sillychat.up.railway.app/')
    }
    
    next();
}
module.exports={ authMiddleware }