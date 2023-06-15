import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/
const calculateTimeDifference = (server: Date, client: Date) => {
  console.log(server)
  return client.getTime() - new Date(server).getTime()
}
const formatDateTime = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: "2-digit"
  };
  return date.toLocaleDateString('en-GB', options);
};

export async function getServerSideProps() {
  const creationDate = formatDateTime(new Date());
  return {
    props: {
      creationDate,
    },
  };
}


export default function Home({creationDate}:any) {
  const router = useRouter();
  const moveToTaskManager = () => {
    router.push("/tasks");
  }
  const csDate = new Date(); 
  const diff = calculateTimeDifference(creationDate,csDate);
  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:{" "}
            <span className="serverTime">{creationDate}</span>
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff:{" "}
            <span className="serverTime">{diff}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}
