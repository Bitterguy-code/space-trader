---SCHEMAS
CREATE TABLE IF NOT EXISTS agents(
    agent_id        serial PRIMARY KEY,
    acount_id       varchar(255),
    symbol          varchar(255),
    headquarters    varchar(255),
    credits         integer,
    starting_faction    varchar(255),
    ship_count      integer
);

CREATE TABLE IF NOT EXISTS userAgentInfo(
    user_id         serial PRIMARY KEY,
    username        varchar(255) NOT NULL,
    agent_id        integer,
    agent_key       varchar(255) NOT NULL,
    FOREIGN KEY (agent_id) REFERENCES agents(agent_id)
);


