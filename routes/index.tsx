import { Head } from "$fresh/runtime.ts";
import CoffeeHelper from "../islands/CoffeeHelper.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Coffee Helper</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <CoffeeHelper />
      </div>
    </>
  );
}
