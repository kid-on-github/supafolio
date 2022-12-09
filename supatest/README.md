Run React:

```
yarn run dev
```

Start and stop Supabase [locally](http://localhost:54323/):

```
yarn supabase start
yarn supabase stop
```



Create new DB migration for Supabase:

```
yarn supabase migration new <migration name>
```

or generate one automatically:

```
yarn supabase db diff --use-migra --file=<migration name>
```

Generate types for databases:

```
# while supabase is running
sudo yarn supabase gen types typescript --local > ./src/database.types.ts
```

Enabling Google Social Auth Locally:
1. Follow the steps [here](https://supabase.com/docs/learn/auth-deep-dive/auth-google-oauth)
2. Add the following to `supabase/config.toml`:
```
[auth.external.google]
enabled = true
client_id = ""
secret = ""
```
3. Add the following url as the callback url in the Google Cloud Platform console:
http://localhost:54321/auth/v1/callback