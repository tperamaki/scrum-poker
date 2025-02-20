import { Game } from '../../components/Game';

export default async function GamePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <main>
      <div>
        <Game id={params.id} />
      </div>
    </main>
  );
}
