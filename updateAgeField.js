import { MongoClient } from 'mongodb';

async function updateAges() {
  const url ="mongodb+srv://andressans10:1997andressa@cluster0.b9t1x.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0"  // Altere pelo seu URI do MongoDB
  const client = new MongoClient(url);

  try {
    await client.connect();
    const database = client.db('cluster0'); // Altere para o nome do seu banco de dados
    const users = database.collection('User'); // Altere para o nome correto da sua coleção

    // Atualiza os campos `age` que são strings para inteiros
    const result = await users.updateMany(
      { age: { $type: 'string' } }, // Filtra onde age é String
      [
        {
          $set: {
            age: { $toInt: "$age" } // Converte age para Int
          }
        }
      ]
    );

    console.log(`${result.matchedCount} documentos encontrados.`);
    console.log(`${result.modifiedCount} documentos atualizados.`);
  } finally {
    await client.close();
  }
}

updateAges().catch(console.dir);
