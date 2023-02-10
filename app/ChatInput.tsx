'use client'

import { FormEvent, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { Message } from "../typing";
import useSWR from "swr";
import { getServerSession } from "next-auth/next";
import fetcher from "../utils/fetchMessages";

type Props = {
    session: Awaited<ReturnType<typeof getServerSession>>;
}

function ChatInput({session}: Props) {
    const [input, setInput] = useState("");
    const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);   
     

    const addMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input) return;
        const messageToSend = input;
        if (!session) return;
        setInput('');

        const id = uuidv4();

        const message: Message = {
            id,
            message: messageToSend,
            created_at: Date.now(),
            username: 'Adeola adeniji',
            profilePic: 'https://links.papareact.com/jne',
            email: 'adeola670@gmail.com'
            // username: session?.user?.name!,
            // profilePic: session?.user?.image!,

            // email: session?.user?.email!,
        }
    

        const uploadMessageToUpstash = async () => {
            const data = await fetch('/api/addMessage',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message,
                }), 
            }).then(res => res.json());
            return [data.message, ...messages!]                
        };
        await mutate(uploadMessageToUpstash, {
            optimisticData: [message, ...messages!],
            rollbackOnError: true,
        });
    };

  return (
    <form onSubmit={addMessage} className="fixed bottom-0 w-full flex px-10 py-5 space-x-2 border-t bg-white border-gray-100">
        <input 
            type="text"
            value={input}
            disabled={!session}
            onChange={e => setInput(e.target.value)} 
            placeholder="Enter your message" 
            className="flex-1 rounded border 
            border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-blue-600 
            focus:border-transparent px-5 py-3 disabled:opacity-50 
            disabled:cursor-not-allowed"
        />
        
        <button className="
            bg-blue-500 hover:bg-blue-700 rounded text-white font-bold py-2 
            px-4 disabled:opacity-50 disabled:cursor-not-allowed" type="submit" disabled={!input}>
        Send</button>
    </form>
  )
}

export default ChatInput;



