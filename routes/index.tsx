import { Head } from "$fresh/runtime.ts";
import CoffeeHelper from "../islands/CoffeeHelper.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>BaristAI</title>
        <style>
          {`
            body {
              background-color: #f7fafc;
            }
          `}
        </style>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md mt-5">
        <CoffeeHelper />
      </div>
    </>
  );
}
