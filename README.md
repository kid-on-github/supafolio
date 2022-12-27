## Intro
I built this MVP in a week to learn more about [Supabase](https://supabase.com/) (an open source Firebase alternative).
This project was based on a smart business card concept that I pitched at a Startup Weekend (my team took 2nd place).
Since it was built in 7 days, it's super minimal and a tad rushed. But it's fully functional and deployed to production, so I call that a win for now :)

Link to the website:
https://mvpplaceholder.com/

Link to my digital business card:
https://mvpplaceholder.com/profile/e3b0b104-dadc-47ed-9ea7-3fd526e06344

---
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



### Deploy to Production
Link the project to the Supabase project:
> Note: your project ref can be found in the supabase url https://app.supabase.com/project/<project ref>
```
npx supabase link --project-ref=<project ref> --password=<password>
```

See what migrations will be applied:
```
npx supabase db push --dry-run
```

Apply migrations to the production database:
```
npx supabase db push
```

Pull the latest database migrations from production to your local machine:
```
npx supabase db remote commit
```
