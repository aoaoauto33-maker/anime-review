ALTER TABLE "User"
ADD CONSTRAINT "user_age_check"
CHECk ("age" >= 0);

ALTER TABLE "User"
ADD CONSTRAINT "user_gender_check"
CHECK ("gender" IN ('male', 'female', 'others'));

ALTER TABLE "User"
ADD CONSTRAINT "user_role_check"
CHECK ("role" IN ('user', 'admin'));

ALTER TABLE "Anime"
ADD CONSTRAINT "anime_release_year_check"
CHECk ("release_year" >= 1900);

ALTER TABLE "Episode"
ADD CONSTRAINT "episode_number_check"
CHECK ("episode_number" >= 0);

ALTER TABLE "Review"
ADD CONSTRAINT "review_rating_check"
CHECK ("rating" >= 1 AND "rating" <= 5);

ALTER TABLE "Request"
ADD CONSTRAINT "request_status_check"
CHECK ("status" IN ('pending', 'approved', 'rejected'));