CREATE TABLE projects (
	_id int PRIMARY KEY AUTO_INCREMENT,
    title varchar(120) NOT NULL
);

CREATE TABLE project_media(
	project_id int REFERENCES projects (_id),
    media_id int REFERENCES media (_id),
    PRIMARY KEY (project_id, media_id)
)