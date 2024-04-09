"use client"
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { YoutubeLoader } from "langchain/document_loaders/web/youtube";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { ChatOllama } from "langchain/chat_models/ollama";
import { OllamaEmbeddings } from "langchain/embeddings/ollama";
import { FaissStore } from "langchain/vectorstores/faiss";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";


export default function Home() {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    async function fetchData() {
      // Initialization of your services
      const YOUTUBE_VIDEO_URL = "https://www.youtube.com/watch?v=iz4sAyfGoQ8";
      const QUESTION =
        "What does Rich Eisen think of the Steelers interest in Russell Wilson?";
      console.log("loading documents....");

      const loader = YoutubeLoader.createFromUrl(YOUTUBE_VIDEO_URL, {
        language: "en",
        addVideoInfo: true
      });
      const rawDocuments = await loader.load();
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 2000,
        chunkOverlap: 400
      });
      const documents = await splitter.splitDocuments(rawDocuments);

      // Initialization of models, embeddings, and database
      console.log("initializing models and db...");
      const embeddings = new OllamaEmbeddings({
        model: "all-minilm:l6-v2"
      });
      const model = new ChatOllama({
        model: "llama2"
      });
      const vectorStore = new FaissStore(embeddings, {});

      console.log("Embedding Documents....");
      vectorStore.addDocuments(documents);

      // running the chain
      const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
        ["system", "Answer the user's question using only the sources below:\n\n{context}"],
        ["human", "{input}"],
      ])

      const combineDocsChain = await createStuffDocumentsChain({
        prompt: questionAnsweringPrompt,
        llm: model,
      })

      // Combine documents and retrieve answers
      console.log("running the chain....");
      const chain = await createRetrievalChain({
        retriever: vectorStore.asRetriever(),
        combineDocsChain
      });

      const stream = await chain.stream({ input: QUESTION });
      let combinedAnswer = "";

      for await (const chunk of stream) {
        combinedAnswer += chunk.answer ?? "";
      }

      setAnswer(combinedAnswer); // Update state to trigger re-render with the answer
    }

    fetchData().catch(console.error); // Error handling
  }, []); // Empty dependency array to run only once

  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col itmes-center justify-center">
      <div>
        <h1>Question Answering System</h1>
        <p>
          Question: What does Rich Eisen think of the Steelers interest in
          Russell Wilson?
        </p>
        <p>Answer: {answer}</p>
      </div>
    </MaxWidthWrapper>
  );
}