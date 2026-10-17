CREATE DATABASE IF NOT EXISTS spec_compare;
USE spec_compare;
CREATE TABLE IF NOT EXISTS specifications (
 id BIGINT PRIMARY KEY AUTO_INCREMENT,
 code VARCHAR(60) NOT NULL,
 title VARCHAR(255) NOT NULL,
 version VARCHAR(40) NOT NULL,
 category VARCHAR(100) NOT NULL,
 content TEXT NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 INDEX idx_spec_code (code), INDEX idx_spec_title (title), INDEX idx_spec_category (category)
);
CREATE TABLE IF NOT EXISTS spec_versions (
 id BIGINT PRIMARY KEY AUTO_INCREMENT,
 specification_id BIGINT NOT NULL,
 version VARCHAR(40) NOT NULL,
 content TEXT NOT NULL,
 change_note VARCHAR(500),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (specification_id) REFERENCES specifications(id)
);
