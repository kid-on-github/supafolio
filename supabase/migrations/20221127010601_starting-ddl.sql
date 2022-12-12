create table user_profiles (
    user_id uuid primary key references auth.users (id) not null,
    full_name text not null,
    title text not null,
    email text not null,
    cell text not null,
    company text not null,
    company_website text not null,
    linkedin text not null,
    instagram text not null,
    facebook text not null,
    twitter text not null
    
    -- CONSTRAINT proper_full_name CHECK (full_name ~* '^[a-zA-Z]+$'),
    -- CONSTRAINT full_name_length CHECK (char_length(full_name) > 3 and char_length(full_name) <15)
);

alter table user_profiles enable row level security;

CREATE POLICY  "all can see" ON "public"."user_profiles"
AS PERMISSIVE FOR  SELECT
TO  PUBLIC
USING (true);

CREATE POLICY  "user can insert" ON "public"."user_profiles"
AS PERMISSIVE FOR  INSERT
TO PUBLIC
WITH CHECK (auth.uid() = user_id);

CREATE POLICY  "owners can update" ON "public"."user_profiles"
AS PERMISSIVE FOR  UPDATE
TO PUBLIC
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);