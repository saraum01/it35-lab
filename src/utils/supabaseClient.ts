import { createClient } from '@supabase/supabase-js';
 
 const supabaseUrl = 'https://qbeipddzxtiddakceyho.supabase.co' ;
 const supabaseKey = 'ieyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiZWlwZGR6eHRpZGRha2NleWhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NTk3NDksImV4cCI6MjA1ODQzNTc0OX0.R0qU0DZObWFLh0X5jzFE8hIsN8LsW5GNhxkoyl_Gg2k';
 
 export const supabase = createClient(supabaseUrl, supabaseKey);