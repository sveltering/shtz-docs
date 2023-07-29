---meta
title: Routes
desc: Set up routes
open: src/trpc/routes/index.ts
---

# Routes
The next step will be to create your first route

## Creating the first route

In the example we have created our `welcome` procedure on the root of our routes.

As you can see we desturctured the argument for the `ctx` variable.

This `ctx` variable contains the data returned from the context function we created in the `init.ts` file.

In this example we destructure the welcome message, but in a more real world scenario we would be getting a user Id for example.

Now we have our first route set up let's create our hook so we can capture all the requests to `/trpc`.

