function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send('Not Authenticated');
}

module.exports = isAuthenticated;