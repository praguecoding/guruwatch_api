import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './appRouter.js';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'https://api.guruwatch.cz/trpc',
      headers() {
        return {
          Authorization: 'Bearer demo',
        };
      },
    }),
  ],
});

async function main() {
  try {

    const projects = await trpc.getProjects.query();
    console.log("Projects", projects);

    const products = await trpc.getProducts.query({ projectId: projects[0]._id });

    if (!products || products.length === 0) {
      console.log('No products found');
      return;
    }
    console.log("Products", products);

    console.log("Setting price to 1000");
    await trpc.setProduct.mutate({
      _id: products[0]._id,
      name: products[0].name,
      price: 1000,
      ean: products[0].ean || '',
      code: products[0].code || '',
      category1: products[0].category1 || '',
      category2: products[0].category2 || ''
    });

    console.log("Přidávám nový produkt");
    const result = await trpc.addProduct.mutate({
      name: "Testovací produkt",
      price: 999,
      ean: "1234567890123",
      code: "TEST001",
      category1: "Elektronika",
      category2: "Počítače",
      projectId: projects[0]._id
    });

    if (result.success) {
      console.log("Nový produkt vytvořen s ID:", result._id);

      console.log("Měním vlastnosti nového produktu");
      const updateResult = await trpc.setProduct.mutate({
        _id: result._id,
        name: "Testovací produkt",
        price: 1500,
        ean: "1234567890123",
        code: "TEST001",
        category1: "Notebooky",
        category2: "Herní"
      });

      if (updateResult.success) {
        console.log("Produkt byl úspěšně aktualizován");
      } else {
        console.log("Nepodařilo se aktualizovat produkt");
      }

      console.log("Mažu vytvořený produkt");
      const deleteResult = await trpc.deleteProduct.mutate({
        productId: result._id
      });

      if (deleteResult.success) {
        console.log("Produkt byl úspěšně smazán");
      } else {
        console.log("Nepodařilo se smazat produkt");
      }

    } else {
      console.log("Nepodařilo se vytvořit nový produkt");
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

main().catch(console.error);
