---meta
title: $many store
open: src/routes/store/many/+page.svelte, src/trpc/routes/index.ts
---

# $many store

Now let's step things up a little. If you look in the example you will see we've added a new procedure `welcomeName`.

We have also imported `zod` and added a sleep function to alter the time to response.


## Putting it together


- The new `welcomeName` procedure accepts a string input with a minimum length of 3 characters.
- we have changed the destructured `input` variable to `name`
- When the procedure is called it has a `sleep` timer to mimic a slow response (to show loading state)
- If the `name` given is equal to `"error"` we throw an error
- Otherwise, return a welcome message with the name
- 
Open `src > routes > store > many > +page.svelte` 

- You'll notice something new! the store has a `.call()` method
- This is how you call the procedure in a `$many` store
- On our `+page.svelte` we immediately call with the name `"Yusaf"`
- You should see the loading state until we get a response from the server
- We then call the server again with the name `"paul"` after 2 seconds
- We then call the server again with the name `"error"` after 4 seconds
- This should trigger an error where we will see the error state