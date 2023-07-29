---meta
title: The init.ts file
desc: Creating the init.ts file
open: src/trpc/init.ts
---

# init.ts

The first place to start is creating the TRPC class.

Although named TRPC this is not be confused with native tRPC, and is a wrapper on native trpc to make things easier. 

In the example we create the context function which returns an object with the property `welcome`

This context function is called every time a request is made to our `path` option (default `/trpc`).

The event argument has all the request information including the url, cookies, headers etc.

This is where you can add context such as a user session etc.

This context will the be provided to all the endpoint/procedures you add to your routes (more on this next)

(Endpoints are also known as procedures in the tRPC world, and can be used synonymously)


## Minimal setup

```ts
import { TRPC } from '@sveltering/shtz/server';

export const t = new TRPC();
```
In the minimal example above the path option will be given a value of `"/trpc"` and the context will be set as an empty object `{}`


## Options
All options for the TRPC class are optional.

### Basic options
- `path` string - Where you want to serve the trpc routes/procedures e.g. mysite.com/trpc
- `context` async function - Create the context for your procedures
- `locals` "always" | "callable" - By default the TRPC class is not available on the locals object, but you can add it as directly (always) or as a callback (callable) 
- `localsKey` string - by default this is `TRPC`. This is the key that will be used to attach the TRPC class to the locals object

### Advanced options
- `origin` string - Must be used alongside `bypassOrigin` options. This is used to replace the origin on requests made by the server
- `bypassOrigin` string - this will replace the origin on calls made from the server
- `beforeResolve` async function - a function that intercepts requests to the trpc procedures before they are resolved
- `beforeResponse` async function - a function that intercepts the responce after the request was resolved
- `resolveOptions` - add native options on the trpc `resolveHTTPResponse` function [github](https://github.com/trpc/trpc/blob/09734dbfc8fbeadc96a64ba92321f1d92602bec3/packages/server/src/http/resolveHTTPResponse.ts#L234)
- `createOptions` - add native options on the `.context().create(createOptions)` method [github](https://github.com/trpc/trpc/blob/09734dbfc8fbeadc96a64ba92321f1d92602bec3/packages/server/src/core/initTRPC.ts#L85)