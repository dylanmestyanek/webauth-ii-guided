# Auth Notes

- It's about the client (software) connecting to the API, it's NOT about the user that is logged in.
- To the server, the same user on the same computer connected from insomnia is different from the same user connected from the browser
- The server has amnesia, it will not remember the client across requests.
- HTTP is stateless, there is no common data shared between client and server.
- We need a way to help the server "remember" the client across requests.

## Cookies 
- A cookie is a container of data
- A browser will automatically send cookies on every request to the **domain** associated with the cookie
- The client (browser) will store the cookie in a special place (NOT called the cookie jar)

A server can send a _header_ suggesting to the client that it stores a cookie.

The client sends the cookies in a _Cookie_ header back to the server.

## Sessions

- Similar to a database
- USed to store data on the server, much like a database