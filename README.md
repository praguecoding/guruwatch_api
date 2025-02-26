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

Klient se připojuje k API serveru Guruwatch a umožňuje provádět následující operace:

## Základní operace

- **Získání seznamu projektů** - `trpc.getProjects.query()`
- **Získání produktů projektu** - `trpc.getProducts.query({ projectId })`

## Správa produktů

### Přidávání produktů

Nový produkt lze přidat pomocí mutace `addProduct`:

```typescript
const result = await trpc.addProduct.mutate({
  name: "Název produktu",
  price: 999,
  ean: "1234567890123",
  code: "KOD001",
  category1: "Hlavní kategorie",
  category2: "Podkategorie",
  projectId: "ID_projektu",
});

// Výsledek obsahuje:
// - success: boolean - úspěch operace
// - _id: string - ID nově vytvořeného produktu
```

### Editace produktů

Existující produkt lze upravit pomocí mutace `setProduct`:

```typescript
const updateResult = await trpc.setProduct.mutate({
  _id: "ID_produktu",
  name: "Nový název",
  price: 1500,
  ean: "1234567890123",
  code: "KOD001",
  category1: "Nová kategorie",
  category2: "Nová podkategorie",
});

// Výsledek obsahuje:
// - success: boolean - úspěch operace
```

### Mazání produktů

Produkt lze smazat pomocí mutace `deleteProduct`:

```typescript
const deleteResult = await trpc.deleteProduct.mutate({
  productId: "ID_produktu",
});

// Výsledek obsahuje:
// - success: boolean - úspěch operace
```

V souboru `src/index.ts` je kompletní ukázka použití všech těchto operací.
