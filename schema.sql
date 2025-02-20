CREATE TABLE blood_work_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL,
    test_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metric_name VARCHAR(100) NOT NULL,
    value DECIMAL NOT NULL,
    unit VARCHAR(20) NOT NULL,
    reference_low DECIMAL,
    reference_high DECIMAL,
    is_primary_concern BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert common blood work metrics
INSERT INTO blood_work_metrics (name, unit, reference_low, reference_high) VALUES
    ('Glucose', 'mg/dL', 70, 100),
    ('Hemoglobin A1C', '%', 4.0, 5.6),
    ('Total Cholesterol', 'mg/dL', 125, 200),
    ('Triglycerides', 'mg/dL', 40, 150),
    ('HDL Cholesterol', 'mg/dL', 40, 60),
    ('LDL Cholesterol', 'mg/dL', 0, 100),
    ('White Blood Cell Count', 'K/uL', 4.0, 11.0),
    ('Red Blood Cell Count', 'M/uL', 4.2, 5.8),
    ('Hemoglobin', 'g/dL', 12.0, 16.0),
    ('Hematocrit', '%', 36.0, 46.0),
    ('Platelet Count', 'K/uL', 150, 450),
    ('Sodium', 'mEq/L', 135, 145),
    ('Potassium', 'mEq/L', 3.5, 5.0),
    ('Calcium', 'mg/dL', 8.5, 10.5),
    ('Creatinine', 'mg/dL', 0.6, 1.2),
    ('BUN (Blood Urea Nitrogen)', 'mg/dL', 7, 20),
    ('ALT', 'U/L', 7, 56),
    ('AST', 'U/L', 10, 40),
    ('Vitamin D', 'ng/mL', 30, 100),
    ('Vitamin B12', 'pg/mL', 200, 900); 