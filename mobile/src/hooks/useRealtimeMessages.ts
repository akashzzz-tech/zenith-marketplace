import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface MobileChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'file' | 'system';
  is_read: boolean;
  created_at: string;
}

export function useMobileRealtimeMessages(conversationId?: string) {
  const [messages, setMessages] = useState<MobileChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!conversationId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: false });

      if (data) {
        setMessages(data as unknown as MobileChatMessage[]);
      }
      setLoading(false);
    };

    fetchMessages();

    // Setup realtime subscription
    const channel = supabase
      .channel(`mobile_chat_${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMsg = payload.new as MobileChatMessage;
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [newMsg, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  const sendMessage = useCallback(
    async (content: string, senderId: string) => {
      if (!conversationId || !content.trim()) return null;

      const payload = {
        conversation_id: conversationId,
        sender_id: senderId,
        content,
        message_type: 'text' as const,
      };

      const { data, error } = await (supabase.from('messages') as any)
        .insert(payload)
        .select()
        .single();

      if (!error && data) {
        setMessages((prev) => [data as unknown as MobileChatMessage, ...prev]);
        return data;
      }
      return null;
    },
    [conversationId]
  );

  return { messages, loading, sendMessage, setMessages };
}
