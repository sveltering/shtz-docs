---meta
title: Premise
description: What's SHTZ all about?
---

# Premise

### I have used or I am familiar with the workings and concepts of SvelteKit and tRPC
[Skip to installation](install)

## I am new to tRPC
Having used [SvelteKit](https://kit.svelte.dev) + [tRPC](https://trpc.io) barebones in previous projects I realised just how powerful they are in their own regards; when combined they are the definition of a power couple. \
However, like any partnership it's not all sunshine and roses. \
So I put everything else to the side and dedicated all my time to bring out the best of both and really make them compliment each other. \
If you are new to tRPC (or have tried and gave up like I first did!), I get it, it can be daunting to start with. \
However, I promise given time and practice, once you get it, you'll be flying towards that deadline!\
And fingers crossed, with this project, getting started now should be a lot easier.

## If I can do it all in SvelteKit alone, why do I need tRPC?
There's no denying, everything that can be achieved with tRPC can be achieved with SvelteKit alone. But there are a few features that tRPC brings that make things a gazillion times easier.

- Intellisense \
  Amongst typesfety and ensuring your logic is all correct, the intellisense/autocompletion is what get's you moving the quickest. \
  And best of all, when editing on the front end, you can be taken right to the backend application logic with one click
- Setting up and routing API endpoints \
  In SvelteKit you'd create your endpoints in your `+server.ts/js` files \
  But, what do you do if you want to share and separate logic all in once place? \
  Well in SvelteKit this would be done by creating 2 seprate directories, each containg a `server.ts` file, and importing shared logic into each file. \
  tRPC handles this very easily, all routes and shared logic can be contained in one place making your code readable and easy to edit.
- Creating context \
  Want to check if a user is logged in from one place and have this information forwaded to all your middleware and endpoints? tRPC.
- Safeguarding your endpoints \
  Creating middlewares in tRPC is really easy and can extend on each other, e.g. extending a user only middleware to create an admin only middleware.  
- Input validation with [zod](https://zod.dev)\
  Before any POST data even reaches your application logic, tRPC can validate the simpler stuff so you don't have to!

## So what does SHTZ bring to the table
- Less boilerplate and set up / Improved DX
- 4 easy to use clients to call your endpoints from
- Easily extendable e.g. session management
- Front end validation
- Stores integration
- Internal tracker for multiple responses - no need to track unique IDs any more
- Prevents wasted calls to endpoints on the backend
- SSR without the complexity
- Still have access to the original trpc instance.





