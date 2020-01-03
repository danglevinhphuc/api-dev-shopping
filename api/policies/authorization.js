/**
 * firebase-auth
 * @description :: Policy that verifies a token header with the firebase admin sdk and attaches the resulting
 * user onto `req.user`. If no token header is present next is called - it does not prevent continuation, use
 * the `authenticated` policy for that.
 */

module.exports = async function(req, res, next) {
  var routeUnChecked = [];
  if(_.indexOf(routeUnChecked,req.route.path) == -1){
    var token = req.headers.authorization;
    if(token && req.headers.username){
      try {
        var response = await sails.helpers.verifyToken.with({ token });
        if(!response.success){
          return res.sendStatus(401);
        }else{
          req.username= req.headers.username;
          return next()
        }
      } catch (error) {
        return res.sendStatus(401);
      }
    }else{
      return res.sendStatus(401);
    }
  }else{
    return next()
  }
}
