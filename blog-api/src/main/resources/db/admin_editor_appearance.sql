SET NAMES utf8mb4;
USE `nblog`;

INSERT INTO site_setting (name_en, name_zh, value, type)
SELECT 'adminEditorAppearance', '后台外观', 'system', 1
FROM DUAL
WHERE NOT EXISTS (
	SELECT 1 FROM site_setting WHERE name_en = 'adminEditorAppearance'
);
