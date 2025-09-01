# JoJo
A conversational AI assistant.

Built with [assistant-ui](https://github.com/Yonom/assistant-ui) and [Vercel AI SDK](https://ai-sdk.dev/docs/introduction).


## How to start
Touch the `.env.local` and define environment variables:
```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Feature
* General agent:
  * Mocked Weather information(Generate ui).
  * Support attach image.
  * Support saving the thread.

## TODO
- Support saving the threads.
- Support attach pdf.
- Some agents with different logic.
- Support MCP

