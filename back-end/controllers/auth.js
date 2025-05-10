const bcrypt = require('bcrypt')

const { getAccounts, saveAccounts } = require('../services/services-acc');

async function register(req, res) {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send('missing fields');

    try {
        const { accounts, sha } = await getAccounts();
        const hsh=await bcrypt.hash(password,10)

        if (accounts.find(acc => acc.username === username)) {
            return res.status(409).send('user already exists');
        }

        const newUser = {
            id: accounts.length > 0 ? accounts[accounts.length - 1].id + 1 : 1,
            username,
            password:hsh,
            registerDate:new Date().toISOString(),
            isBanned:false,
            pfp:'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg',
            friends:{},
            directs:{}
        };

        accounts.push(newUser);
        await saveAccounts(accounts, sha);
        res.status(201).send('account created');
    } catch (err) {
        console.error(err);
        res.status(500).send(`500 internal server error`);
    }
}

async function validate(req, res) {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send('missing fields');

    try {
        const { accounts } = await getAccounts();
        const user = accounts.find(acc => acc.username === username);

        if (!user) return res.status(404).send('user not found');

        // compare
        const match=await bcrypt.compare(password,user.password)
        if (!match) {
            return res.status(401).send('invalid password');
        }
        req.session.user = { password: user.password, username: user.username, userId: user.id };
        res.status(200).send('logged in.');

    } catch (err) {
        console.error(err);
        res.status(500).send('internal server error');
    }
}

module.exports = { register, validate };