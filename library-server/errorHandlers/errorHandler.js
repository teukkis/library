

const unknownEndpoint = (error, request, response, next) => {
    response.status(404).send({ error: 'unknown endpoint' })
    next(error)
  }

const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.send(error.message)
      } 
      
      else if (error.name === 'ValidationError') {
        return response.send(error)
      } 
  
    next(error)
}

const incorrectAddress = (request, response, next) => {
    response.status(404).send({
        status: 'failed',
        message: `Can't find ${request.originalUrl} on this server`
      });
}


module.exports = {
    errorHandler,
    unknownEndpoint,
    incorrectAddress
}

