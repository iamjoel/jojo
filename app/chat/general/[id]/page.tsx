import { Assistant } from "@/app/assistant";
import { loadChat } from "@/utils/chat-store";

const CATEGORY = 'general'
export default async function Home(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const messages = await loadChat(CATEGORY, id)
  return <Assistant category={CATEGORY} initialMessages={messages} />;
}
