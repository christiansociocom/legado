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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          number_of_guests: number
          package_id: string | null
          phone: string | null
          special_requests: string | null
          status: string
          total_price: number | null
          travel_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          number_of_guests?: number
          package_id?: string | null
          phone?: string | null
          special_requests?: string | null
          status?: string
          total_price?: number | null
          travel_date: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          number_of_guests?: number
          package_id?: string | null
          phone?: string | null
          special_requests?: string | null
          status?: string
          total_price?: number | null
          travel_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "tour_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_package_requests: {
        Row: {
          accommodation_type: string | null
          activities: string[] | null
          budget_range: string | null
          created_at: string
          destination_ids: string[] | null
          duration_days: number | null
          email: string
          full_name: string
          id: string
          number_of_guests: number | null
          phone: string | null
          special_requests: string | null
          status: string
          travel_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          accommodation_type?: string | null
          activities?: string[] | null
          budget_range?: string | null
          created_at?: string
          destination_ids?: string[] | null
          duration_days?: number | null
          email: string
          full_name: string
          id?: string
          number_of_guests?: number | null
          phone?: string | null
          special_requests?: string | null
          status?: string
          travel_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          accommodation_type?: string | null
          activities?: string[] | null
          budget_range?: string | null
          created_at?: string
          destination_ids?: string[] | null
          duration_days?: number | null
          email?: string
          full_name?: string
          id?: string
          number_of_guests?: number | null
          phone?: string | null
          special_requests?: string | null
          status?: string
          travel_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      destinations: {
        Row: {
          best_time_to_visit: string | null
          category: string | null
          created_at: string
          description: string | null
          entry_fee: string | null
          gallery_urls: string[] | null
          highlights: string[] | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          location_lat: number | null
          location_lng: number | null
          name: string
          short_description: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          best_time_to_visit?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          entry_fee?: string | null
          gallery_urls?: string[] | null
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          location_lat?: number | null
          location_lng?: number | null
          name: string
          short_description?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          best_time_to_visit?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          entry_fee?: string | null
          gallery_urls?: string[] | null
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          location_lat?: number | null
          location_lng?: number | null
          name?: string
          short_description?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          destination_id: string | null
          id: string
          is_approved: boolean | null
          package_id: string | null
          rating: number
          reviewer_name: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          destination_id?: string | null
          id?: string
          is_approved?: boolean | null
          package_id?: string | null
          rating: number
          reviewer_name?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          destination_id?: string | null
          id?: string
          is_approved?: boolean | null
          package_id?: string | null
          rating?: number
          reviewer_name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "tour_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_packages: {
        Row: {
          created_at: string
          description: string | null
          destination_ids: string[] | null
          difficulty: string | null
          duration_days: number
          excluded: string[] | null
          id: string
          image_url: string | null
          included: string[] | null
          is_active: boolean | null
          is_featured: boolean | null
          itinerary: Json | null
          max_group_size: number | null
          name: string
          price_usd: number
          short_description: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          destination_ids?: string[] | null
          difficulty?: string | null
          duration_days?: number
          excluded?: string[] | null
          id?: string
          image_url?: string | null
          included?: string[] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          itinerary?: Json | null
          max_group_size?: number | null
          name: string
          price_usd: number
          short_description?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          destination_ids?: string[] | null
          difficulty?: string | null
          duration_days?: number
          excluded?: string[] | null
          id?: string
          image_url?: string | null
          included?: string[] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          itinerary?: Json | null
          max_group_size?: number | null
          name?: string
          price_usd?: number
          short_description?: string | null
          slug?: string
          updated_at?: string
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
          role: Database["public"]["Enums"]["app_role"]
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
