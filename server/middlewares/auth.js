const admin = require('../firebase')

exports.authCheck= async (req, res,next) => {
    // console.log(req.headers)
    try{
        const firebaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken)
        // console.log('FIREBASE USER IS AUTHCHECK', firebaseUser)
        req.user = firebaseUser
        next()
    }catch(err){
        console.log(err)
        res.status(401).json({
            message: 'Invalid or expired token'
        })
    }
    
}