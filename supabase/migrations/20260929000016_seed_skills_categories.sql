-- 20260929000016_seed_skills_categories.sql

-- Insert Skills
INSERT INTO public.skills (name, category) VALUES
('JavaScript', 'Software Engineering'),
('TypeScript', 'Software Engineering'),
('Python', 'Software Engineering'),
('Java', 'Software Engineering'),
('Go', 'Software Engineering'),
('Rust', 'Software Engineering'),
('SQL', 'Software Engineering'),
('PostgreSQL', 'Software Engineering'),
('React', 'Software Engineering'),
('Next.js', 'Software Engineering'),
('Node.js', 'Software Engineering'),
('AWS', 'Software Engineering'),
('Azure', 'Software Engineering'),
('GCP', 'Software Engineering'),
('Docker', 'Software Engineering'),
('Kubernetes', 'Software Engineering'),
('CI/CD', 'Software Engineering'),

('R', 'Data Science'),
('TensorFlow', 'Data Science'),
('PyTorch', 'Data Science'),
('Pandas', 'Data Science'),
('Spark', 'Data Science'),
('Statistics', 'Data Science'),
('ML', 'Data Science'),
('Deep Learning', 'Data Science'),

('Penetration Testing', 'Cybersecurity'),
('SIEM', 'Cybersecurity'),
('SOC', 'Cybersecurity'),
('Network Security', 'Cybersecurity'),
('Cloud Security', 'Cybersecurity'),
('ISO 27001', 'Cybersecurity'),

('CAD', 'Mechanical Engineering'),
('SolidWorks', 'Mechanical Engineering'),
('AutoCAD', 'Mechanical Engineering'),
('FEA', 'Mechanical Engineering'),
('ANSYS', 'Mechanical Engineering'),
('Product Design', 'Mechanical Engineering'),
('Manufacturing', 'Mechanical Engineering'),

('Structural Analysis', 'Civil Engineering'),
('Revit', 'Civil Engineering'),
('Project Planning', 'Civil Engineering'),

('BIM', 'Architecture'),
('Urban Planning', 'Architecture'),

('PMP', 'Project Management'),
('Agile', 'Project Management'),
('Scrum', 'Project Management'),
('PRINCE2', 'Project Management'),
('Risk Management', 'Project Management'),
('Stakeholder Management', 'Project Management'),

('Strategy', 'Business Consulting'),
('Operations', 'Business Consulting'),
('Digital Transformation', 'Business Consulting'),
('Change Management', 'Business Consulting'),

('Financial Modeling', 'Finance'),
('Excel', 'Finance'),
('Bloomberg', 'Finance'),
('Risk', 'Finance'),
('Compliance', 'Finance'),
('Auditing', 'Finance'),

('Healthcare Management', 'Healthcare Consulting'),
('Medical Writing', 'Healthcare Consulting'),
('Regulatory Affairs', 'Healthcare Consulting')
ON CONFLICT (name) DO NOTHING;
