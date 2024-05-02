const {verify} = require('jsonwebtoken')

const valideToken = (req, res, next) => {
    const token = req.header('token')

    if(!token) return res.json({error: "Пользователь не вошёл в систему"})

    try {
        const valideToken = verify(token, 'secret')
        req.email = valideToken
        if(valideToken){
            return next()
        }
    } 
    catch (err){
        return res.json({error: err})
    }
}

module.exports = {valideToken}