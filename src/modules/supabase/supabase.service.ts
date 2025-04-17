import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://fcpzzotlxomoiibvzzuc.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjcHp6b3RseG9tb2lpYnZ6enVjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDg2NTMxOCwiZXhwIjoyMDYwNDQxMzE4fQ.VtqjFWAb0Bby1QVQsgLafHuM_XsO_HbjppUU2b9aapg',
    );
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
