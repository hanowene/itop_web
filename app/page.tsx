import { sql } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';
import BoxHome1 from './components/home/BoxHome1';
import BoxHome2a from './components/home/BoxHome2a';
import BoxHome2b from './components/home/BoxHome2b';
import FooterHome from './components/footer/footer';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  // const result = await sql`
  //   SELECT id, name, username, email 
  //   FROM users 
  //   WHERE name ILIKE ${'%' + search + '%'};
  // `;
  // const users = result.rows as User[];

  return (
    <main className="p-1 md:p-4 mx-auto max-w-7xl">
      {/* <BoxHome1 /> */}

      {/* <Title>Users</Title>
      <Text>A list of users retrieved from a Postgres database.</Text> */}
      
      {/* <Search /> */}
      {/* <Card className="mt-6">
        <UsersTable users={users} />
      </Card> */}
    </main>
  );
}
