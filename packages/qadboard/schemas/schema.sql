CREATE TABLE Cards (
                       id INTEGER PRIMARY KEY AUTOINCREMENT,
                       content TEXT NOT NULL,
                       writer TEXT NOT NULL,
                       like_reactions INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE Sections (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          name TEXT NOT NULL,
                          color TEXT NOT NULL
);

CREATE TABLE Boards (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL
);

-- A table to link Cards to Sections
CREATE TABLE SectionCards (
                              section_id INTEGER,
                              card_id TEXT,
                              FOREIGN KEY(section_id) REFERENCES Sections(id),
                              FOREIGN KEY(card_id) REFERENCES Cards(id)
);

-- A table to link Sections to Boards
CREATE TABLE BoardSections (
                               board_id INTEGER,
                               section_id INTEGER,
                               FOREIGN KEY(board_id) REFERENCES Boards(id),
                               FOREIGN KEY(section_id) REFERENCES Sections(id)
);