function validateJsonSyntax(err,req,res,next){
    if(err instanceof SyntaxError && err.status === 400 && 'body' in err){
        err.status =400;
        err.message = 'Invalid JSON';
        return next(err);
    }
    next(err);
}

module.exports = validateJsonSyntax;