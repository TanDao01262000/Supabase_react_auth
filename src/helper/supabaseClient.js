import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bxtdugybvwyzewkckazv.supabase.co';
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4dGR1Z3lidnd5emV3a2NrYXp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NTQ0MTAsImV4cCI6MjA2MjEzMDQxMH0.UHZ2Vpj0G9Wpwa7npaFJxjnSBmSxf2bUZtK9HMHt2c0";

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;