-- 20260929000014_create_indexes.sql

CREATE INDEX idx_professional_profiles_search ON public.professional_profiles(verification_status, is_publicly_visible, industry, eligibility_route);
CREATE INDEX idx_projects_search ON public.projects(status, category, client_profile_id, created_at);
CREATE INDEX idx_proposals_lookup ON public.proposals(project_id, professional_profile_id, status);
CREATE INDEX idx_contracts_lookup ON public.contracts(client_profile_id, professional_profile_id, status);
CREATE INDEX idx_milestones_lookup ON public.milestones(contract_id, status, payment_state);
CREATE INDEX idx_payments_lookup ON public.payments(contract_id, milestone_id, state);
CREATE INDEX idx_ledger_entries_lookup ON public.ledger_entries(transaction_group_id, payment_id, contract_id, created_at);
CREATE INDEX idx_messages_lookup ON public.messages(conversation_id, sender_id, created_at);
CREATE INDEX idx_notifications_lookup ON public.notifications(user_id, is_read, created_at);
CREATE INDEX idx_audit_logs_lookup ON public.audit_logs(actor_id, action, resource_type, created_at);
CREATE INDEX idx_fraud_flags_lookup ON public.fraud_flags(flagged_user_id, is_resolved, risk_level);
