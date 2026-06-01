CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    organization_id UUID NOT NULL REFERENCES organizations(id),

    full_name VARCHAR(255) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    role VARCHAR(50) NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);