-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- InsertName
INSERT INTO categories (id, name, created_at, updated_at)
VALUES 
    (gen_random_uuid(), 'WORK', NOW(), NOW()),
    (gen_random_uuid(), 'STUDIES', NOW(), NOW()),
    (gen_random_uuid(), 'PERSONAL', NOW(), NOW()),
    (gen_random_uuid(), 'HEALTH', NOW(), NOW()),
    (gen_random_uuid(), 'PROJECTS', NOW(), NOW()),
    (gen_random_uuid(), 'SHOPPING', NOW(), NOW()),
    (gen_random_uuid(), 'LEISURE', NOW(), NOW()),
    (gen_random_uuid(), 'TRAVEL', NOW(), NOW()),
    (gen_random_uuid(), 'FINANCES', NOW(), NOW()),
    (gen_random_uuid(), 'EVENTS', NOW(), NOW());
