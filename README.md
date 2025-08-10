# Video Game Blog

A simple blog dedicated to video games with user roles and full text editor for admins and authors. Uses Supabase for authentication and data storage.

## Setup

1. **Clone the repo**  
   ```
   git clone <your-repo-url>
   cd videogame-blog
   ```

2. **Install dependencies**  
   ```
   npm install
   ```

3. **Setup Supabase**  
   - Create a new project at [Supabase](https://supabase.com/).
   - Copy your project’s `URL` and `anon key` into a `.env` file based on `.env.example`.
   - In Supabase, create the following tables:

     ```sql
     -- Table: profiles
     create table profiles (
       id uuid primary key references auth.users on delete cascade,
       role text default 'user'
     );

     -- Table: posts
     create table posts (
       id uuid default uuid_generate_v4() primary key,
       title text not null,
       content text not null,
       author_email text,
       created_at timestamp default now()
     );
     ```

   - Enable Row Level Security (RLS) and create policies as needed.

4. **Run the app**  
   ```
   npm run dev
   ```

5. **Assign Roles**  
   - By default, new users have the "user" role.
   - To assign "admin" or "author" roles, manually update the `profiles` table in Supabase.

## Features

- User registration & login
- Role-based access (admin, author, user)
- Rich text editor for admins/authors
- List and view posts
