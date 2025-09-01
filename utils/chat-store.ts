import { generateId, UIMessage } from 'ai';
import { existsSync, mkdirSync } from 'fs';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

export async function createChat(category: string): Promise<string> {
  const id = generateId(); // generate a unique chat ID
  await writeFile(getChatFile(category, id), '[]'); // create an empty chat file
  return id;
}

function getChatFile(category: string, id: string): string {
  const chatDir = path.join(process.cwd(), '.chats');
  if (!existsSync(chatDir)) mkdirSync(chatDir, { recursive: true });
  return path.join(chatDir, `${category}-${id}.json`);
}

export async function loadChat(category: string, id: string): Promise<UIMessage[]> {
  return JSON.parse(await readFile(getChatFile(category, id), 'utf8'));
}

export async function saveChat({
  chatId,
  messages,
  category,
}: {
  chatId: string;
  messages: UIMessage[];
  category: string;
}): Promise<void> {
  const content = JSON.stringify(messages, null, 2);
  await writeFile(getChatFile(category, chatId), content);
}

