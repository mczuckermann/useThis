import React, { ReactElement } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/client';
import { User } from 'next-auth';
import { GET_QUIZZES_TAKEN_BY_USER } from '../../graphql/queries/quizzesTakenByUser';
import { useQuery } from '@apollo/react-hooks';
import { ResultQuiz } from '../../components/Form/ResultQuiz';

type Problems = [
  {
    choices: [
      {
        answer: string;
        isCorrect: boolean;
      }
    ];
  }
];
type Result = {
  _id: string;
  userEmail: string;
  answers: number[];
  dateCreated: Date;
};
type Quiz = {
  name: string;
  problems: Problems;
  results: Result[];
};

const Quizzes = ({ user }: { user: User }): ReactElement => {
  const { data, loading, error } = useQuery(GET_QUIZZES_TAKEN_BY_USER, {
    variables: { userEmail: user.email },
  });

  return (
    <main className="layout">
      <h1>
        {user?.name
          ? `These are your test results, ${user.name}!`
          : `These are your test results!`}
      </h1>
      <hr />
      {loading ? (
        <section className="flex-centered card">LOADING...</section>
      ) : error ? (
        <section className="flex-centered card">Error</section>
      ) : (
        <section className="flex-centered card">
          {/* Map through quizzes taken by user fetched from database */}
          {data.quizzesTakenByUser.map((quiz: Quiz, quizIndex: number) => {
            return (
              <ResultQuiz key={quizIndex} quiz={quiz} quizIndex={quizIndex} />
            );
          })}
        </section>
      )}
    </main>
  );
};

export default Quizzes;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<Record<string, never> | { props: { user: User } }> {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    return {};
  }
  return {
    props: {
      user: session.user,
    },
  };
}
