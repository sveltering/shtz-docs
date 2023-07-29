---meta
title: Test
desc: Testing the browser client
open: src/routes/+page.svelte
---

# Test
Now let's put it all together

## Using the browser client

In our root `+page.svelte` file let's use the browser client

From the example you can see we import the `browserClient` and `ProcedureReturnType` type.

We then create the welcome variable and set the type as the return type of the `welcome` procedure using `ProcedureReturnType`

We then call the procedure in a self-invoking async function.

## `npm run dev` it

If you `console.log(welcome)` in the self invoking function you'll see the expected response in the browser console. 

However, check your terminal and you'll notice it's undefined! 

This is one of the features of SHTZ. 

But why?

The way svelte works, any scripts in `+page.svelte` run twice. First on the server for SSR, and then again in the browser.

With any requests, the request is still called on the server. However, svelte doesn't wait for a response and continues to return the page without SSR.

Hence, instead of wasting a call, SHTZ by default only makes the call when in browser, and immediately resolves with `undefined` on the backend.

Don't worry though, if you need SSR we've got you covered! Keep going!

![Up and running!](/img/01.png)