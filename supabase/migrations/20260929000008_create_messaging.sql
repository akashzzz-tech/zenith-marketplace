-- 20260929000008_create_messaging.sql

CREATE TABLE public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id),
    contract_id UUID,
    participant_one_id UUID NOT NULL REFERENCES public.users(id),
    participant_two_id UUID NOT NULL REFERENCES public.users(id),
    is_system_created BOOLEAN NOT NULL DEFAULT false,
    last_message_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (project_id, participant_one_id, participant_two_id)
);
COMMENT ON TABLE public.conversations IS 'Conversations between users.';

CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.users(id),
    content TEXT NOT NULL,
    message_type TEXT NOT NULL DEFAULT 'text',
    is_read BOOLEAN NOT NULL DEFAULT false,
    read_at TIMESTAMPTZ,
    is_flagged BOOLEAN NOT NULL DEFAULT false,
    flag_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.messages IS 'Messages within conversations.';

CREATE TABLE public.message_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID NOT NULL REFERENCES public.messages(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size_bytes BIGINT,
    mime_type TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.message_attachments IS 'Attachments sent in messages.';

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Conversations viewable by participants" ON public.conversations FOR SELECT USING (
    auth.uid() = participant_one_id OR auth.uid() = participant_two_id
);
CREATE POLICY "Conversations insertable by participants" ON public.conversations FOR INSERT WITH CHECK (
    auth.uid() = participant_one_id OR auth.uid() = participant_two_id
);
CREATE POLICY "Conversations updatable by participants" ON public.conversations FOR UPDATE USING (
    auth.uid() = participant_one_id OR auth.uid() = participant_two_id
);

CREATE POLICY "Messages viewable by conversation participants" ON public.messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = conversation_id AND (c.participant_one_id = auth.uid() OR c.participant_two_id = auth.uid()))
);
CREATE POLICY "Messages insertable by sender" ON public.messages FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = conversation_id AND (c.participant_one_id = auth.uid() OR c.participant_two_id = auth.uid()))
);
CREATE POLICY "Messages updatable by sender" ON public.messages FOR UPDATE USING (sender_id = auth.uid());

CREATE POLICY "Message_attachments viewable by participants" ON public.message_attachments FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.messages m JOIN public.conversations c ON m.conversation_id = c.id WHERE m.id = message_id AND (c.participant_one_id = auth.uid() OR c.participant_two_id = auth.uid()))
);
CREATE POLICY "Message_attachments insertable by sender" ON public.message_attachments FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.messages m WHERE m.id = message_id AND m.sender_id = auth.uid())
);
