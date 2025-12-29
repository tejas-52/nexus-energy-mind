export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_chat_history: {
        Row: {
          content: string
          created_at: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      automation_rules: {
        Row: {
          action_type: string
          action_value: Json | null
          condition_type: string
          condition_value: Json | null
          created_at: string | null
          description: string | null
          executions_count: number | null
          id: string
          is_active: boolean | null
          last_executed_at: string | null
          name: string
          priority: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          action_type: string
          action_value?: Json | null
          condition_type: string
          condition_value?: Json | null
          created_at?: string | null
          description?: string | null
          executions_count?: number | null
          id?: string
          is_active?: boolean | null
          last_executed_at?: string | null
          name: string
          priority?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          action_type?: string
          action_value?: Json | null
          condition_type?: string
          condition_value?: Json | null
          created_at?: string | null
          description?: string | null
          executions_count?: number | null
          id?: string
          is_active?: boolean | null
          last_executed_at?: string | null
          name?: string
          priority?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      carbon_credits: {
        Row: {
          co2_offset_kg: number
          created_at: string | null
          credits_earned: number
          id: string
          period_end: string
          period_start: string
          source: string
          user_id: string
        }
        Insert: {
          co2_offset_kg?: number
          created_at?: string | null
          credits_earned?: number
          id?: string
          period_end: string
          period_start: string
          source: string
          user_id: string
        }
        Update: {
          co2_offset_kg?: number
          created_at?: string | null
          credits_earned?: number
          id?: string
          period_end?: string
          period_start?: string
          source?: string
          user_id?: string
        }
        Relationships: []
      }
      digital_twins: {
        Row: {
          battery_capacity_kwh: number | null
          battery_current_charge: number | null
          created_at: string | null
          grid_connection: boolean | null
          id: string
          monthly_consumption_kwh: number | null
          name: string
          panel_capacity_watts: number | null
          panel_count: number | null
          panel_efficiency: number | null
          panel_orientation: number | null
          panel_tilt: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          battery_capacity_kwh?: number | null
          battery_current_charge?: number | null
          created_at?: string | null
          grid_connection?: boolean | null
          id?: string
          monthly_consumption_kwh?: number | null
          name?: string
          panel_capacity_watts?: number | null
          panel_count?: number | null
          panel_efficiency?: number | null
          panel_orientation?: number | null
          panel_tilt?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          battery_capacity_kwh?: number | null
          battery_current_charge?: number | null
          created_at?: string | null
          grid_connection?: boolean | null
          id?: string
          monthly_consumption_kwh?: number | null
          name?: string
          panel_capacity_watts?: number | null
          panel_count?: number | null
          panel_efficiency?: number | null
          panel_orientation?: number | null
          panel_tilt?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      energy_listings: {
        Row: {
          available_from: string | null
          available_until: string | null
          created_at: string | null
          energy_amount_kwh: number
          id: string
          is_active: boolean | null
          latitude: number | null
          listing_type: string
          location: string | null
          longitude: number | null
          price_per_kwh: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          available_from?: string | null
          available_until?: string | null
          created_at?: string | null
          energy_amount_kwh: number
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          listing_type: string
          location?: string | null
          longitude?: number | null
          price_per_kwh: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          available_from?: string | null
          available_until?: string | null
          created_at?: string | null
          energy_amount_kwh?: number
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          listing_type?: string
          location?: string | null
          longitude?: number | null
          price_per_kwh?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      energy_readings: {
        Row: {
          id: string
          reading_type: string
          recorded_at: string | null
          user_id: string
          value_kwh: number
        }
        Insert: {
          id?: string
          reading_type: string
          recorded_at?: string | null
          user_id: string
          value_kwh: number
        }
        Update: {
          id?: string
          reading_type?: string
          recorded_at?: string | null
          user_id?: string
          value_kwh?: number
        }
        Relationships: []
      }
      energy_transactions: {
        Row: {
          buyer_id: string | null
          completed_at: string | null
          created_at: string | null
          energy_amount_kwh: number
          id: string
          price_per_kwh: number
          seller_id: string | null
          status: string | null
          total_price: number
          transaction_type: string | null
        }
        Insert: {
          buyer_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          energy_amount_kwh: number
          id?: string
          price_per_kwh: number
          seller_id?: string | null
          status?: string | null
          total_price: number
          transaction_type?: string | null
        }
        Update: {
          buyer_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          energy_amount_kwh?: number
          id?: string
          price_per_kwh?: number
          seller_id?: string | null
          status?: string | null
          total_price?: number
          transaction_type?: string | null
        }
        Relationships: []
      }
      iot_devices: {
        Row: {
          created_at: string | null
          device_type: string
          id: string
          is_on: boolean | null
          is_online: boolean | null
          is_smart: boolean | null
          name: string
          power_consumption_watts: number | null
          priority: number | null
          schedule: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_type: string
          id?: string
          is_on?: boolean | null
          is_online?: boolean | null
          is_smart?: boolean | null
          name: string
          power_consumption_watts?: number | null
          priority?: number | null
          schedule?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_type?: string
          id?: string
          is_on?: boolean | null
          is_online?: boolean | null
          is_smart?: boolean | null
          name?: string
          power_consumption_watts?: number | null
          priority?: number | null
          schedule?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          latitude: number | null
          location: string | null
          longitude: number | null
          subscription_plan: string | null
          trading_rating: number | null
          trust_score: number | null
          updated_at: string | null
          user_id: string
          user_type: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          subscription_plan?: string | null
          trading_rating?: number | null
          trust_score?: number | null
          updated_at?: string | null
          user_id: string
          user_type?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          subscription_plan?: string | null
          trading_rating?: number | null
          trust_score?: number | null
          updated_at?: string | null
          user_id?: string
          user_type?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
