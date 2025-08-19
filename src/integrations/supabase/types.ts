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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      blog_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          category: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          id: number
          image_url: string | null
          published: boolean | null
          published_at: string | null
          title: string
        }
        Insert: {
          author: string
          category?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          id?: number
          image_url?: string | null
          published?: boolean | null
          published_at?: string | null
          title: string
        }
        Update: {
          author?: string
          category?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          id?: number
          image_url?: string | null
          published?: boolean | null
          published_at?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["name"]
          },
        ]
      }
      cultural_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      cultural_types: {
        Row: {
          category_id: number | null
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "cultural_types_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "cultural_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      cultural_works: {
        Row: {
          address: string | null
          approval_date: string | null
          approved_by: string | null
          author: string
          category_id: number | null
          contact_info: Json | null
          created_at: string | null
          description: string | null
          id: number
          image_urls: string[] | null
          latitude: number
          longitude: number
          material_ids: number[] | null
          region_id: number | null
          status: string | null
          submission_date: string | null
          submitted_by: string | null
          tags: string[] | null
          title: string
          type_id: number | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          approval_date?: string | null
          approved_by?: string | null
          author: string
          category_id?: number | null
          contact_info?: Json | null
          created_at?: string | null
          description?: string | null
          id?: number
          image_urls?: string[] | null
          latitude: number
          longitude: number
          material_ids?: number[] | null
          region_id?: number | null
          status?: string | null
          submission_date?: string | null
          submitted_by?: string | null
          tags?: string[] | null
          title: string
          type_id?: number | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          approval_date?: string | null
          approved_by?: string | null
          author?: string
          category_id?: number | null
          contact_info?: Json | null
          created_at?: string | null
          description?: string | null
          id?: number
          image_urls?: string[] | null
          latitude?: number
          longitude?: number
          material_ids?: number[] | null
          region_id?: number | null
          status?: string | null
          submission_date?: string | null
          submitted_by?: string | null
          tags?: string[] | null
          title?: string
          type_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cultural_works_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "cultural_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cultural_works_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cultural_works_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "cultural_types"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      regions: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cube: {
        Args: { "": number[] } | { "": number }
        Returns: unknown
      }
      cube_dim: {
        Args: { "": unknown }
        Returns: number
      }
      cube_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      cube_is_point: {
        Args: { "": unknown }
        Returns: boolean
      }
      cube_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      cube_recv: {
        Args: { "": unknown }
        Returns: unknown
      }
      cube_send: {
        Args: { "": unknown }
        Returns: string
      }
      cube_size: {
        Args: { "": unknown }
        Returns: number
      }
      earth: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      gc_to_sec: {
        Args: { "": number }
        Returns: number
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      latitude: {
        Args: { "": unknown }
        Returns: number
      }
      longitude: {
        Args: { "": unknown }
        Returns: number
      }
      sec_to_gc: {
        Args: { "": number }
        Returns: number
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
