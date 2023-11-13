BEGIN;

-- Insert the boards
INSERT INTO Boards(name) VALUES ('test'), ('test2'), ('test3'), ('test4');

-- Insert the sections under board 'test'
INSERT INTO Sections(name, color) VALUES ('What we have done well', 'green'),
                                         ('What didn''t go so well', 'red'),
    ('How can we improve', 'blue');

-- Map the inserted sections to 'test' board
INSERT INTO BoardSections(board_id, section_id) VALUES (1, 1), (1, 2), (1, 3);

-- Insert the cards
INSERT INTO Cards(content, writer, like_reactions) VALUES
('Thank you Firdaus for support me when new cluster having issue even weekend support me.', 'Isaac', 2),
('Thanks Firdaus for created a firm base for EP project before transfer back to Mesh and Connect.', 'Kane', 4),
('Thanks Kane/Kensley/John for awesome onboarding to EP + Bravos to Azwan for soloing testing & e2e', 'Steven', 1),
('Thanks Kane/Kensley/John for awesome onboarding to EP + Bravos to Azwan for soloing testing & e2e', 'Steven', 1),
('Thank you Firdaus for support me when new cluster having issue even weekend support me.', 'Isaac', 2),
('Thanks Steven and Azwan for great contribution on EP project and cover me up on and off. Appreciated that.', 'Kane', 1),
('Thanks Steven and Azwan for great contribution on EP project and cover me up on and off. Appreciated that.', 'Kane', 1);

-- Map the inserted cards to the first 'test' board section
INSERT INTO SectionCards(section_id, card_id) VALUES (1, '1'), (1, '2'),
(1, '3'), (1, '4'), (1, '5'), (1, '6'), (1, '7');

-- Insert the cards for other sections
INSERT INTO Cards(content, writer, like_reactions) VALUES
('Quite messy when the EP project staging open to let other project''user/tester to start testing. Some of them not understand the flow,', 'Kane', 1),
('One thing on pinging others for help, we should try solving ourselves first before taking others time. Found questions were answered before and come back with the same question after while. Found questions that a simple Googling or chat-gpt or referring to the ticket would answer.', '', 7),
('One thing on pinging others for help, we should try solving ourselves first before taking others time. Found questions were answered before and come back with the same question after while. Found questions that a simple Googling or chat-gpt or referring to the ticket would answer.', '', 7);


-- Map the inserted cards to the other 'test' board sections
INSERT INTO SectionCards(section_id, card_id) VALUES (2, '1'), (3, '1'), (3, '2');

COMMIT;