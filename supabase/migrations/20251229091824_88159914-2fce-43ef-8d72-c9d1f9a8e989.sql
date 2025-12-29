-- Create prediction history table
CREATE TABLE public.prediction_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  panel_count INTEGER NOT NULL,
  panel_capacity_watts INTEGER NOT NULL,
  panel_efficiency NUMERIC NOT NULL,
  panel_tilt INTEGER NOT NULL,
  temperature NUMERIC NOT NULL,
  sunlight_hours NUMERIC NOT NULL,
  cloud_cover NUMERIC NOT NULL,
  location TEXT,
  daily_generation NUMERIC NOT NULL,
  monthly_generation NUMERIC NOT NULL,
  yearly_estimate NUMERIC NOT NULL,
  monthly_savings NUMERIC NOT NULL,
  yearly_savings NUMERIC NOT NULL,
  carbon_offset NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.prediction_history ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own predictions"
ON public.prediction_history
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own predictions"
ON public.prediction_history
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own predictions"
ON public.prediction_history
FOR DELETE
USING (auth.uid() = user_id);