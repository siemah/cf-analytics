CREATE TABLE `statytics` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text DEFAULT NULL,
	`url` text DEFAULT NULL,
	`referrer` text DEFAULT NULL,
	`ip` text DEFAULT NULL,
	`latitude` text DEFAULT NULL,
	`country` text DEFAULT NULL,
	`language` text DEFAULT NULL,
	`city` text DEFAULT NULL,
	`region` text DEFAULT NULL,
	`regionCode` text DEFAULT NULL,
	`asOrganization` text DEFAULT NULL,
	`postalCode` text DEFAULT NULL,
	`dataCenterCode` text DEFAULT NULL,
	`browser` text DEFAULT NULL,
	`os` text DEFAULT NULL,
	`clientAcceptEncoding` text DEFAULT NULL,
	`tlsVersion` text DEFAULT NULL,
	`timezone` text DEFAULT NULL,
	`httpProtocol` text DEFAULT NULL,
	`createdAt` integer DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE INDEX `idx_statytics_id` ON `statytics` (`id`);--> statement-breakpoint
CREATE INDEX `idx_statytics_url` ON `statytics` (`url`);--> statement-breakpoint
CREATE INDEX `idx_statytics_country` ON `statytics` (`country`);--> statement-breakpoint
CREATE INDEX `idx_statytics_region` ON `statytics` (`region`);--> statement-breakpoint
CREATE INDEX `idx_statytics_browser` ON `statytics` (`id`);--> statement-breakpoint
CREATE INDEX `idx_statytics_referrer` ON `statytics` (`referrer`);