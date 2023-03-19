import { useCallback, useState } from "preact/hooks";

const promptHint = `Help me to find best coffee.`;
const promptLength = 280;

export default function CoffeeHelper() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const onValueChange = useCallback((e: any) => {
    setPrompt((e.target as HTMLTextAreaElement).value);
  }, [prompt]);

  const onClick = useCallback(async () => {
    setLoading(true);
    setResult("");

    const response = await fetch("/api/gpt", {
      method: "POST",
      body: prompt.substring(0, promptLength),
    });

    const data = await response.text();
    setResult(data);
    setLoading(false);
  }, [prompt]);

  return (
    <div>
      <div class="flex flex-wrap">
        <h1 className="text-2xl font-bold mb-5 flex items-center text-gray-500">
          BARIST{" "}
          <span class="rounded-md ml-1 text-white px-1 bg-red-600 w-8 h-8">
            AI
          </span>
        </h1>
        <span className="ml-auto my-2 text-gray-500 text-xs hidden md:block">
          This project is using GPT-3.5 to generate answers.
        </span>
      </div>
      <textarea
        className="w-full h-32 p-4 border rounded shadow-lg resize-none"
        value={prompt}
        onInput={onValueChange}
        placeholder={promptHint}
        maxLength={promptLength}
      >
      </textarea>
      <div class="flex justify-end">
        <span class="text-gray-500 text-sm">
          {prompt.length}/{promptLength}
        </span>
      </div>
      <div class="flex items-start mt-2 flex-col md:flex-row">
        <div class="text-sm text-gray-500 pr-5">
          Write any coffee related text and click "Get Help Now" to get a new
          coffee. You can ask for ingredients, brewing methods, or anything
          else.
        </div>
        <button
          type="button"
          onClick={onClick}
          className="inline-flex items-center justify-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-red-600 hover:bg-red-500 transition ease-in-out duration-150 whitespace-nowrap mt-4 text-center w-full md:w-auto md:mt-0"
          disabled={loading || prompt.length === 0}
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              >
              </circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              >
              </path>
            </svg>
          )}
          {loading ? "Brewing Answer..." : "Get Help Now"}
        </button>
      </div>

      {result && (
        <div className="mt-5 border-t" style={{ whiteSpace: "pre-wrap" }}>
          <div className="my-3 text-xl font-semibold text-gray-600 flex flex-col">
            AI'S ANSWER:
            <span className="w-10 h-px bg-gray-600 mt-1"></span>
          </div>
          <p className="text-gray-500">
            {result}
          </p>
        </div>
      )}
    </div>
  );
}
