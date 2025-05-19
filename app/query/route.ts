import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data;
}

async function DeleteAllTables() {
  await sql`DROP TABLE IF EXISTS invoices;`;
  await sql`DROP TABLE IF EXISTS users;`;
  await sql`DROP TABLE IF EXISTS customers;`;
  await sql`DROP TABLE IF EXISTS revenue;`;
}

export async function GET() {
  try {

    //await sql.begin((sql) => (DeleteAllTables()))

    //return Response.json({ message: 'Success' });

    return Response.json(await listInvoices());
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
