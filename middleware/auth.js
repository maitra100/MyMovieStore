const jwt=require("jsonwebtoken");


function auth(req,res,next){
  const token= req.header("x-auth-token");
  if(!token) return res.status(401).send("invalid token");

  try{
      const decode=jwt.verify(token,"jwtprivatekey");
      req.user=decode;
      next();
  }
  catch(e){
      res.status(400).send("invalid token");
  }
};

module.exports=auth;