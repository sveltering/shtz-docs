---meta
title: Browser Client
open: src/routes/+page.svelte
---

# The browser client

In this example we have added the `browserOnly:false` option, and we have added a `console.log(welcome);` in the `+page.svelte` file.

Now if you open this page and check the console in your browser and your terminal you will see that the value is logged, however if you check the source code of the page, it still renders as though the `welcome` variable was undefined.

If instead you want the data to be SSR, then you can use any of the other clients.

![browser console!](/img/02.png)
![terminal!](/img/03.png)
![page source!](/img/04.png)
