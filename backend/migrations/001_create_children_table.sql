CREATE TABLE IF NOT EXISTS children (
    id UUID PRIMARY KEY,
    full_name TEXT NOT NULL,
    age INT NOT NULL,
    birth_date DATE NOT NULL,
    gender TEXT NOT NULL,
    description TEXT,
    location TEXT,
    photos TEXT[],
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
); 