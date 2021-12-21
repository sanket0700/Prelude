const jwt = require('jsonwebtoken');

const auth = async( res, req, next ) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;

        decodedData = jwt.verify(token, 'prelude');
        req.userId = decodedData?.id;

        next();

    } catch (error){
        console.log(error);
    }
}

export default auth;