---meta
title: The journey of event
desc: The journey of the event object in sveltekit
---

# The journey of `event` in SvelteKit
Sure, you don't need to know this stuff, but it sure as hell helps to! \
To really understand what's going on, let's go under the hood.

## Taking a trip down event avenue
- User arrives to website \
  The user's browser make's a request to your SvelteKit server.\
  In this request are details such as the url being requested, headers and cookies
- [`hooks.server.ts`](https://kit.svelte.dev/docs/hooks#server-hooks) \
  `hooks.server.ts` is an optional file where we can extend on the usual behvaiour of our SvelteKit application. \
  The first place we can look at this request is within a `handle` function in the `hooks.server.ts` file \
  Here, we can also manipulate the request, redirect the user, add response headers, throw an error, provide an alternative response etc. \
  Example from SvelteKit website. Anyone requesting `/custom` will recieve an alternate response of `"custom response"`, otherwise continue with SvelteKit's normal behaviour
  ```ts
  /** @type {import('@sveltejs/kit').Handle} */
    export async function handle({ event, resolve }) {
        if (event.url.pathname.startsWith('/custom')) {
            return new Response('custom response');
        }
        const response = await resolve(event);
        return response;
    }
  ```
- Locals \
  Before the request is handed off to any `+server.js/ts` files, we can add information unique and relevent to this specific request/event using locals. \
  Another example from the SvelteKit website, where we attach user information to the locals object.
  ```ts
    /** @type {import('@sveltejs/kit').Handle} */
    export async function handle({ event, resolve }) {
        event.locals.user = await getUserInformation(event.cookies.get('sessionid'));
        const response = await resolve(event);
        return response;
    }
  ```

- `+server.js`, `+layout.server.js`, `+page.server.js`
  The last place our event reaches if our `+server.js/ts` files. \
  Here is where you would usually act upon the information given and or return information to the user. \
  Continuing on from our last example 
  ```ts
    export async function load({ locals }) {
        return {
            posts: await getUserPosts(locals.user)
        };
    }
  ```

## Adding a little flavour with some tRPC seasoning
Don't focus on the boilerplate and implementations, there's more on this later. For now, let's grasp the journery of the `event` object. 
- When setting up our TRPC object we have a few options to help us set up a hook to intercept requests to our trpc endpoints. \
  The `path` option is optional with the default value being `/trpc`. This is the path you can choose to intercept all requests to trpc endpoints. \
  The `context` function allows you to provide context which will be passed on to all middleware and endpoints. In this example we return the user.
  
    ```ts
    export const t = new TRPC({
        path: '/trpc',
        context: async function(event){
            return {
                user: await getUserInformation(event.cookies.get('sessionid'))
            }
        }
    });
    ```
- First we need to see if the user is making a request to one of or trpc endpoints \
  In the example below we intercept the event object with the `handleHook` method. \
  `handleHook` is one of the features of SHTZ, which takes care of intercepting all `/trpc` requests.
  ```ts
    export async function handle({ event, resolve }) {
        const TRPCResponse = await handleHook(event);
        if (TRPCResponse) {
            return TRPCResponse;
        }

        const response = await resolve(event);
        return response;
    }  
  ```
- Accessing the context \
  In this router the endpoint `welcomeUser` gets the user provided from the context funtion returns a welcome message of the user's name.
  ```ts
    export default t.router({
        welcomeUser: t.procedure.query(function ({ ctx }) {
            return `Welcome ${ctx.user.name}`;
        })
    });
  ```
