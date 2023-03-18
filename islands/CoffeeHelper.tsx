import { useCallback, useState } from "preact/hooks";

export default function CoffeeHelper() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const onValueChange = useCallback((e: any) => {
    setPrompt((e.target as HTMLTextAreaElement).value);
  }, [prompt]);

  const onClick = useCallback(async () => {
    setLoading(true);

    const response = await fetch("/api/gpt", {
      method: "POST",
      body: prompt,
    });

    const data = await response.text();
    setResult(data);
    setLoading(false);
  }, [prompt]);

  return (
    <div>
      <h1 class="text-2xl font-bold mb-5">BaristAI</h1>
      <textarea
        className="w-full h-64 p-2 border border-gray-300 rounded"
        value={prompt}
        onInput={onValueChange}
      >
      </textarea>
      <button
        className="w-full p-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600 active:bg-blue-700"
        onClick={onClick}
      >
        Bana Kahve Konusunda Yardımcı Ol
      </button>
      <div className="mt-2 whitespace-pre-wrap">
        {loading ? "Barista düşünüyor..." : result}
      </div>
    </div>
  );
}
