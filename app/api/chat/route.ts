import { weatherTool } from "@/app/tools/weather/tool";
import { loadChat, saveChat } from "@/utils/chat-store";
import { openai } from "@ai-sdk/openai";
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  generateId,
  createUIMessageStream,
  createUIMessageStreamResponse,
} from "ai";

const CATEGORY = 'general'
export async function POST(req: Request) {
  const { message, id }: { message: UIMessage; id: string } = await req.json();
  const previousMessages = await loadChat(CATEGORY, id)
  const messages = [...previousMessages, message];
  const stream = createUIMessageStream({
    execute: ({ writer }) => {
      // Write start message part with custom ID
      writer.write({
        type: 'start',
        messageId: generateId(), // Generate server-side ID for persistence
      });

      const result = streamText({
        model: openai('gpt-4o-mini'), // 'gpt-4o'
        messages: convertToModelMessages(messages),
        tools: {
          getWeather: weatherTool
        }
      });

      writer.merge(result.toUIMessageStream({ sendStart: false })); // omit start message part
    },
    originalMessages: messages,
    onFinish({ messages }) {
      saveChat({ chatId: id, messages, category: CATEGORY });
    }
  });

  return createUIMessageStreamResponse({ stream });
}
