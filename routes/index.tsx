import { Head } from "$fresh/runtime.ts";
import CleanCodeHelper from "../islands/CleanCodeHelper.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>CleanCodeAI</title>
        <style>
          {`
            html, body {
              background-color: #f7fafc;
            }
          `}
        </style>
      </Head>
      <div className="flex flex-col p-4 mx-auto max-w-screen-md md:py-10 h-full">
        <main>
          <CleanCodeHelper />
        </main>
        <footer className="text-gray-500 text-xs text-center pt-10 pb-2 md:text-right">
          Open Sourced on <a href="https://github.com/akayibrahim/cleancodeai">GitHub</a>.
        </footer>
      </div>
    </>
  );
}
