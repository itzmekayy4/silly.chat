async function logout(req,res) {
    if (req.session.user){
        req.session = null
        res.redirect('/')
    }
}

module.exports={ logout }