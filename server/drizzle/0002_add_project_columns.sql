ALTER TABLE "projects" ADD COLUMN "project_summary" text;
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "features" json;
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "timeline" json;
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "risks" json;