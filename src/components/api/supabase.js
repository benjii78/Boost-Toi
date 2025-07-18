import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ypuzxrduzfloyclajutj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwdXp4cmR1emZsb3ljbGFqdXRqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjE3ODczMiwiZXhwIjoyMDYxNzU0NzMyfQ.gK0Vom3ScsWv5HIUt7tVEtJQO7pSlfngdARAHRAricI";

export const supabase = createClient(supabaseUrl, supabaseKey);
