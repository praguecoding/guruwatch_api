# Demo ukázka TRPC clienta pro Guru dashboard

Jedna se o klient pro TRPC API serveru Guruwatch.

```shell
npm run api
```

Spustění zde:

```shell
npm run dev
```

# Popis

Klient se připojuje k API serveru a umožňuje spousty různých operací.

V souboru `src/index.ts` je ukázka použití.

# Připomínky

- Projekty se získávají z API, ale vůbec se neukládají do lokálního stavu.
- Při editaci produktu se opět získávají projekty z API.
- Při mazání produktu se opět získávají projekty z API.
