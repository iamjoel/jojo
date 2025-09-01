"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useAISDKRuntime } from "@assistant-ui/react-ai-sdk";
// import { useDataStreamRuntime } from '@assistant-ui/react-data-stream'
import { Thread } from "@/components/assistant-ui/thread";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import WeatherToolUI from "@/app/tools/weather/ui";
import { useParams } from "next/navigation";
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, UIMessage } from "ai";

type Props = {
  category: string;
  initialMessages: UIMessage[]
}
export const Assistant = ({
  category,
  initialMessages
}: Props) => {
  const { id } = useParams();

  const chat = useChat({
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: '/api/chat',
      // only send the last message to the server:
      prepareSendMessagesRequest({ messages }) {
        return { body: { message: messages[messages.length - 1], id, category } };
      },
    }),
  })
  const runtime = useAISDKRuntime(chat);
  // get id from url params


  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <SidebarProvider>
        <div className="flex h-dvh w-full pr-0.5">
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="https://www.assistant-ui.com/docs/getting-started" target="_blank" rel="noopener noreferrer">
                      Assistant Doc
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <div className="flex-1 overflow-hidden">
              <Thread />
              {/* Tools UI */}
              <WeatherToolUI />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AssistantRuntimeProvider>
  );
};
