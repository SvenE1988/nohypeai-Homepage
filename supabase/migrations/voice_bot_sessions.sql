
-- Add new columns to the voice_bot_sessions table
ALTER TABLE voice_bot_sessions 
ADD COLUMN IF NOT EXISTS session_uuid UUID,
ADD COLUMN IF NOT EXISTS client_ip TEXT,
ADD COLUMN IF NOT EXISTS join_url TEXT;
