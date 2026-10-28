// Supabase Configuration & Client Initialization
const SUPABASE_URL = 'https://yvzrgtplhigadbuyhwbf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2enJndHBsaGlnYWRidXlod2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxOTIyMDEsImV4cCI6MjEwODc2ODIwMX0.mIpTk5YXN2uwmcUQqqhiZXFQV-tPPq9zVJ7kUga92pc';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
