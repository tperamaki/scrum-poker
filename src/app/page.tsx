import { NewGameLink } from '@/components/Buttons';
import { randomUUID } from 'crypto';
import Link from 'next/link';

export default function LandingPage() {
  const newGameId = randomUUID();
  return (
    <main className="p-5">
      <h2 className="text-3xl font-bold mt-5 mb-5">Welcome to scrum poker.</h2>
      <p className="py-6">
        Use a link from your friend or a colleague to join, or{' '}
        <NewGameLink className="underline hover:text-red-800 dark:hover:text-red-200">
          create a new room.
        </NewGameLink>
      </p>
      <div className="flex flex-col gap-5 py-6 px-10 border-solid rounded-lg border-2 mt-5 mb-10 leading-relaxed">
        <h3 className="text-xl font-bold">What is scrum poker?</h3>
        <p>
          Scrum Poker is a collaborative technique used by agile teams to
          estimate the effort or complexity of user stories or tasks. It allows
          team members to contribute their individual insights and knowledge to
          arrive at a shared understanding of the work involved.
        </p>
        <br />
        <h3 className="text-xl font-bold">
          Why yet another online scrum poker?
        </h3>
        <p>
          It&apos;s true that there are many similar scrum pokers available.
          Some have more features than this one, but most of them are not free,
          or they are bloated with ads, or require you to signup.
        </p>
        <p>
          I wanted to create a scrum poker that is really free to use for
          everyone, and one that is open-source, so anyone can contribute. You
          can find a link to Github on bottom of this page.
        </p>
        <p>
          Do you need a feature that does not exist yet, but don&apos;t know how
          to code? No worries, you can still go to Github and open an issue for
          everyone to see, and maybe it gets implemented. Ideas are welcome!
        </p>
        <p>
          Want to support the development of this app? Github sponsors is the
          way to do just that, just go to{' '}
          <Link
            className="underline hover:text-red-800 dark:hover:text-red-200"
            href="https://github.com/sponsors/tperamaki"
          >
            https://github.com/sponsors/tperamaki
          </Link>{' '}
          for more information.
        </p>
        <br />
        <h3 className="text-xl font-bold">How does Scrum Poker work?</h3>
        <ol className="list-decimal">
          <li className="py-2">
            <p>
              Gather your team: Bring together the individuals involved in the
              estimation process. The people participating in the estimation
              should only be the ones that are actually implementing the
              features, so no product owners or such.
            </p>
          </li>
          <li className="py-2">
            <p>
              Select an user story or task: Choose a specific item from your
              project backlog that needs to be estimated. Break it down into
              manageable chunks if necessary.
            </p>
          </li>
          <li className="py-2">
            <p>
              Assign story points: Story points are a relative unit of
              measurement used in Scrum Poker to represent the effort,
              complexity, or size of a user story or task. Each participant will
              assign a story point value to the selected item independently and
              privately. Story points cannot be linked to working days or hours,
              but are instead an estimation that can be used to compare to other
              tasks that have been estimated in the same way.
            </p>
          </li>
          <li className="py-2">
            <p>
              Show the cards: Everyone reveals their assigned card
              simultaneously, so others won&apos;t be able to affect the choices
              of other individuals.
            </p>
          </li>
          <li className="py-2">
            <p>
              Discuss and clarify: If there is a wide range of estimates,
              encourage team members to discuss their reasoning and share their
              perspectives. This fosters communication and allows for a better
              understanding of the task.
            </p>
          </li>
          <li className="py-2">
            <p>
              Choose an estimate: After discussion choose together an estimate
              that everyone can agree with, if estimates are really close to
              each other, it might not need discussion and the average can be
              chosen, but if some estimate is clearly smaller or larger, then
              discussion is needed.
            </p>
          </li>
        </ol>
        <br />
        <h3 className="text-xl font-bold">How does Scrum Poker help teams:</h3>
        <ol className="list-decimal">
          <li className="py-2">
            <p>
              Foster collaboration: By involving all team members in the
              estimation process, Scrum Poker encourages collaboration and
              ensures that everyone&apos;s input is considered.
            </p>
          </li>
          <li className="py-2">
            <p>
              Promote transparency: The open discussion during Scrum Poker
              promotes transparency within the team. It allows for a deeper
              understanding of the work involved and any potential challenges.
            </p>
          </li>
          <li className="py-2">
            <p>
              Improve estimation accuracy: The collective wisdom and diverse
              perspectives of the team result in more accurate estimations.
              Scrum Poker helps eliminate biases and minimizes the risk of
              underestimating or overestimating tasks.
            </p>
          </li>
          <li className="py-2">
            <p>
              Enhance team communication: Scrum Poker facilitates communication
              and knowledge sharing among team members. It encourages active
              participation and provides a platform for individuals to express
              their thoughts and concerns.
            </p>
          </li>
        </ol>
        <p>
          Remember, the goal of Scrum Poker is not to find the &quot;right&quot;
          answer, but to leverage the collective intelligence of the team to
          arrive at a consensus estimate. It is a valuable tool for agile teams
          to plan and prioritize their work effectively.
        </p>
        <p>
          Start estimating with Scrum Poker today and experience the benefits of
          collaborative estimation in your projects. Happy planning!
        </p>
      </div>
    </main>
  );
}
