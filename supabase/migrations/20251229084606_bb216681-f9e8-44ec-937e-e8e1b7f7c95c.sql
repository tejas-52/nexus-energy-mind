-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for secure role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    location TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    trust_score DECIMAL(3, 2) DEFAULT 5.0,
    trading_rating DECIMAL(3, 2) DEFAULT 5.0,
    user_type TEXT DEFAULT 'hybrid' CHECK (user_type IN ('producer', 'consumer', 'hybrid')),
    subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'pro', 'enterprise')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create digital twins table
CREATE TABLE public.digital_twins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL DEFAULT 'My Energy Setup',
    panel_count INTEGER DEFAULT 10,
    panel_capacity_watts INTEGER DEFAULT 400,
    panel_efficiency DECIMAL(5, 2) DEFAULT 20.0,
    panel_tilt INTEGER DEFAULT 30,
    panel_orientation INTEGER DEFAULT 180,
    battery_capacity_kwh DECIMAL(10, 2) DEFAULT 10.0,
    battery_current_charge DECIMAL(10, 2) DEFAULT 5.0,
    grid_connection BOOLEAN DEFAULT true,
    monthly_consumption_kwh DECIMAL(10, 2) DEFAULT 500.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.digital_twins ENABLE ROW LEVEL SECURITY;

-- Create automation rules table
CREATE TABLE public.automation_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    condition_type TEXT NOT NULL CHECK (condition_type IN ('solar_surplus', 'grid_price_high', 'battery_low', 'forecast_low', 'peak_hours', 'custom')),
    condition_value JSONB,
    action_type TEXT NOT NULL CHECK (action_type IN ('sell_energy', 'store_energy', 'use_battery', 'reduce_load', 'notify', 'custom')),
    action_value JSONB,
    is_active BOOLEAN DEFAULT true,
    priority INTEGER DEFAULT 1,
    executions_count INTEGER DEFAULT 0,
    last_executed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.automation_rules ENABLE ROW LEVEL SECURITY;

-- Create energy transactions table (P2P marketplace)
CREATE TABLE public.energy_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    buyer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    energy_amount_kwh DECIMAL(10, 2) NOT NULL,
    price_per_kwh DECIMAL(10, 4) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
    transaction_type TEXT DEFAULT 'sell' CHECK (transaction_type IN ('sell', 'buy')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.energy_transactions ENABLE ROW LEVEL SECURITY;

-- Create energy listings table
CREATE TABLE public.energy_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    listing_type TEXT NOT NULL CHECK (listing_type IN ('sell', 'buy')),
    energy_amount_kwh DECIMAL(10, 2) NOT NULL,
    price_per_kwh DECIMAL(10, 4) NOT NULL,
    available_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    available_until TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    location TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.energy_listings ENABLE ROW LEVEL SECURITY;

-- Create IoT devices table
CREATE TABLE public.iot_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    device_type TEXT NOT NULL CHECK (device_type IN ('hvac', 'water_heater', 'ev_charger', 'pool_pump', 'washer', 'dryer', 'dishwasher', 'lighting', 'other')),
    power_consumption_watts INTEGER DEFAULT 0,
    is_smart BOOLEAN DEFAULT false,
    is_online BOOLEAN DEFAULT true,
    is_on BOOLEAN DEFAULT false,
    schedule JSONB,
    priority INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.iot_devices ENABLE ROW LEVEL SECURITY;

-- Create energy readings table (for tracking)
CREATE TABLE public.energy_readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    reading_type TEXT NOT NULL CHECK (reading_type IN ('generation', 'consumption', 'storage', 'grid_export', 'grid_import')),
    value_kwh DECIMAL(10, 4) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.energy_readings ENABLE ROW LEVEL SECURITY;

-- Create carbon credits table
CREATE TABLE public.carbon_credits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    credits_earned DECIMAL(10, 4) NOT NULL DEFAULT 0,
    co2_offset_kg DECIMAL(10, 4) NOT NULL DEFAULT 0,
    source TEXT NOT NULL CHECK (source IN ('solar_generation', 'energy_trading', 'grid_offset', 'efficiency_bonus')),
    period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.carbon_credits ENABLE ROW LEVEL SECURITY;

-- Create AI chat history table
CREATE TABLE public.ai_chat_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.ai_chat_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for digital_twins
CREATE POLICY "Users can view their own digital twins"
ON public.digital_twins FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own digital twins"
ON public.digital_twins FOR ALL
USING (auth.uid() = user_id);

-- RLS Policies for automation_rules
CREATE POLICY "Users can view their own automation rules"
ON public.automation_rules FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own automation rules"
ON public.automation_rules FOR ALL
USING (auth.uid() = user_id);

-- RLS Policies for energy_transactions
CREATE POLICY "Users can view their own transactions"
ON public.energy_transactions FOR SELECT
USING (auth.uid() = seller_id OR auth.uid() = buyer_id);

CREATE POLICY "Users can create transactions"
ON public.energy_transactions FOR INSERT
WITH CHECK (auth.uid() = seller_id OR auth.uid() = buyer_id);

CREATE POLICY "Users can update their own transactions"
ON public.energy_transactions FOR UPDATE
USING (auth.uid() = seller_id OR auth.uid() = buyer_id);

-- RLS Policies for energy_listings
CREATE POLICY "Anyone can view active listings"
ON public.energy_listings FOR SELECT
USING (is_active = true OR auth.uid() = user_id);

CREATE POLICY "Users can manage their own listings"
ON public.energy_listings FOR ALL
USING (auth.uid() = user_id);

-- RLS Policies for iot_devices
CREATE POLICY "Users can view their own devices"
ON public.iot_devices FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own devices"
ON public.iot_devices FOR ALL
USING (auth.uid() = user_id);

-- RLS Policies for energy_readings
CREATE POLICY "Users can view their own readings"
ON public.energy_readings FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own readings"
ON public.energy_readings FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for carbon_credits
CREATE POLICY "Users can view their own carbon credits"
ON public.carbon_credits FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own carbon credits"
ON public.carbon_credits FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for ai_chat_history
CREATE POLICY "Users can view their own chat history"
ON public.ai_chat_history FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own chat history"
ON public.ai_chat_history FOR ALL
USING (auth.uid() = user_id);

-- Trigger for auto-creating profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name');
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_digital_twins_updated_at BEFORE UPDATE ON public.digital_twins FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_automation_rules_updated_at BEFORE UPDATE ON public.automation_rules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_energy_listings_updated_at BEFORE UPDATE ON public.energy_listings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_iot_devices_updated_at BEFORE UPDATE ON public.iot_devices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();