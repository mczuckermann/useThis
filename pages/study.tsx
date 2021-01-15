import React, { ReactElement } from 'react';
import { getSession } from 'next-auth/client';
import { User } from 'next-auth';
import { GetServerSidePropsContext } from 'next';

const Study = ({ user }: { user: User }): ReactElement => {
  return (
    <main className="layout">
      <h1>{user?.name ? `Let's study, ${user.name}!` : `Let's study!`}</h1>
      <section>
        <div className="flexCentered card">
          <h2>w3schools</h2>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.w3schools.com/js/js_this.asp"
          >
            <img
              width="300"
              alt="w3schools-logo"
              src="https://imstartpage.com/wp-content/uploads/2015/01/W3Schools-logo.png"
            />
          </a>
        </div>
        <div className="flexCentered card">
          <h2>jstutorial</h2>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.javascripttutorial.net/javascript-this/"
          >
            <img
              width="300"
              alt="javascript-logo"
              src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
            />
          </a>
        </div>
      </section>
    </main>
  );
};

export default Study;

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
