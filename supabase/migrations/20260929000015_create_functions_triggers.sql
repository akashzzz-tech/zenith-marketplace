-- 20260929000015_create_functions_triggers.sql

-- 1. update_updated_at()
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 2. Apply trigger
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_professional_profiles_updated_at BEFORE UPDATE ON public.professional_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_client_profiles_updated_at BEFORE UPDATE ON public.client_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON public.proposals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON public.contracts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_milestones_updated_at BEFORE UPDATE ON public.milestones FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_disputes_updated_at BEFORE UPDATE ON public.disputes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. increment_proposal_count()
CREATE OR REPLACE FUNCTION public.increment_proposal_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.projects
    SET proposal_count = proposal_count + 1
    WHERE id = NEW.project_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_proposal_created
    AFTER INSERT ON public.proposals
    FOR EACH ROW
    EXECUTE FUNCTION public.increment_proposal_count();

-- 4. check_refund_total()
CREATE OR REPLACE FUNCTION public.check_refund_total()
RETURNS TRIGGER AS $$
DECLARE
    total_refunded BIGINT;
    original_amount BIGINT;
BEGIN
    SELECT amount_cents INTO original_amount FROM public.payments WHERE id = NEW.payment_id;
    SELECT COALESCE(SUM(amount_cents), 0) INTO total_refunded FROM public.refunds WHERE payment_id = NEW.payment_id AND status != 'failed';
    
    IF total_refunded + NEW.amount_cents > original_amount THEN
        RAISE EXCEPTION 'Total refunds cannot exceed original payment amount.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_refund_limit
    BEFORE INSERT ON public.refunds
    FOR EACH ROW
    EXECUTE FUNCTION public.check_refund_total();

-- 5. calculate_profile_completion()
CREATE OR REPLACE FUNCTION public.calculate_profile_completion(prof_id UUID)
RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
    prof RECORD;
    prof_count INTEGER;
BEGIN
    SELECT * INTO prof FROM public.professional_profiles WHERE id = prof_id;
    IF NOT FOUND THEN RETURN 0; END IF;
    
    IF prof.professional_title IS NOT NULL AND prof.professional_title != '' THEN score := score + 10; END IF;
    IF prof.industry IS NOT NULL AND prof.industry != '' THEN score := score + 10; END IF;
    IF prof.specialization IS NOT NULL AND prof.specialization != '' THEN score := score + 10; END IF;
    
    SELECT COUNT(*) INTO prof_count FROM public.experience WHERE professional_profile_id = prof_id;
    IF prof_count > 0 THEN score := score + 20; END IF;
    
    SELECT COUNT(*) INTO prof_count FROM public.education WHERE professional_profile_id = prof_id;
    IF prof_count > 0 THEN score := score + 10; END IF;
    
    SELECT COUNT(*) INTO prof_count FROM public.professional_skills WHERE professional_profile_id = prof_id;
    IF prof_count > 0 THEN score := score + 20; END IF;
    
    SELECT COUNT(*) INTO prof_count FROM public.portfolio WHERE professional_profile_id = prof_id;
    IF prof_count > 0 THEN score := score + 20; END IF;
    
    RETURN LEAST(score, 100);
END;
$$ LANGUAGE plpgsql;
