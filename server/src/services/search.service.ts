import { tavily } from "@tavily/core";

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});

export async function searchWeb(query: string) {
  try {
    const result = await tvly.search(query, {
      maxResults: 5,
      searchDepth: "basic",
    });

    return result.results.map((item) => ({
      title: item.title,
      url: item.url,
      content: item.content,
    }));
  } catch (error) {
    console.error("Tavily search failed:", error);

    return [
      {
        title: "Search Error",
        url: "",
        content: "Unable to retrieve search results.",
      },
    ];
  }
}