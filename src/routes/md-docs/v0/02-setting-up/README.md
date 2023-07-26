---meta
title: Setting up shtz
---

# Setting Up

### Create setup files in terminal [OR manual setup](#create-setup-files-manually)
Open terminal at the root dir of your app.

```bash
cd src && touch hooks.server.ts && mkdir -p trpc && cd "$_" && touch init.ts hooks.ts browserClients.ts serverClients.ts && mkdir -p routes && cd "$_" && touch index.ts && cd ../../../
```

### Create setup files manually
Follow the files structure in the code section.