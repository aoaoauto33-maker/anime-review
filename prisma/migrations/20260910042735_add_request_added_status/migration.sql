ALTER TABLE "Request"
DROP CONSTRAINT "request_status_check";

ALTER TABLE "Request"
ADD CONSTRAINT "request_status_check"
CHECK ("status" IN ('pending', 'approved', 'rejected', 'added'));