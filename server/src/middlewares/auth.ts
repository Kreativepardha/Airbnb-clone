import jwt, { JwtPayload } from 'jsonwebtoken'


export const isAuthenticated = (req:any,res:any,next:any ) => {
        const authHeader = req.headers.authorization
        console.log("authHeader in isAuthenticated:", authHeader); 
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ msg: "User is not authenticated" });
        }
    
        const token = authHeader.split(' ')[1]
        if(!token) return res.status(401).json({msg:"User is not authenticated"})

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET as string ) as JwtPayload
                req.user = decoded
                next();
            } catch (err) {
                return res.status(401).json({ msg: "Invalid Token" });
            }

}