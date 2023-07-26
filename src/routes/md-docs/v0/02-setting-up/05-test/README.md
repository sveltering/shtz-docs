---meta
title: Test
desc: Testing the browser client
open: src/routes/+page.svelte
---

# Test
Now let's put it all together

## Using the browser client

In our root `+page.svelte` file let's use the browser client

From the example you can see we import the `browserClient` and `ProcedureReturnType` type;

We then create the welcome variable and set the type as the return type of the `welcome` procedure

We then call the procedure in a self-invoking async function.

## `npm run dev` it

If you `console.log(welcome)` in the self incovking function you'll see the expected response in the browser console. 

However, check your terminal and you'll notice it's undefined!

![Up and running!](/img/01.png)