/**
 * Enum {RequestMethod} contains the possible HTTP request methods.
 * 
 * @ordinal {string} POST - The POST method requests that the server accept the entity enclosed in the request as a new subordinate of the web resource identified by the Request-URI.
 * @ordinal {string} GET - The GET method requests a representation of the specified resource. Requests using GET should only retrieve data and should have no other effect on the server.
 * @ordinal {string} HEAD - The HEAD method asks for the response identical to the one that would correspond to a GET request, but without the response body.
 * @ordinal {string} PUT - The PUT method requests that the enclosed entity be stored at the supplied Request-URI.
 * @ordinal {string} PATCH - The PATCH method applies partial modifications to a resource.
 * @ordinal {string} DELETE - The DELETE method deletes the specified resource.
 */
export enum RequestMethod {
    POST = "POST",
    GET = "GET",
    HEAD = "HEAD",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
};