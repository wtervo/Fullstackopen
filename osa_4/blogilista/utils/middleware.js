const unknownEndpoint = (request, response) => {
    response.status(404).send({error: "Unknown endpoint"})
}

module.exports = {
    unknownEndpoint
}