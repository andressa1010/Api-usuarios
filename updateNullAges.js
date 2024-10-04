import { MongoClient } from 'mongodb';

async function updateNullAges() {
   const url ="mongodb+srv://andressans10:1997andressa@cluster0.b9t1x.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0"  // Altere pelo seu URI do MongoDB
  const client = new MongoClient(url);

  try {
    await client.connect();
    const database = client.db('cluster0'); // Altere para o nome do banco
    const users = database.collection('User'); // Nome correto da coleção

    // Atualiza os campos `age` que estão `null` para um valor padrão (exemplo: 0)
    const result = await users.updateMany(
      { age: null }, // Filtra onde age é null
      {
        $set: { age: 0 } // Define o valor 0 para age
      }
    );

    console.log(`${result.matchedCount} documentos encontrados.`);
    console.log(`${result.modifiedCount} documentos atualizados.`);
  } finally {
    await client.close();
  }
}

updateNullAges().catch(console.dir);
