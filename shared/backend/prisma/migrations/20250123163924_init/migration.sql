-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('RESTAURANT', 'GYM', 'HOTEL', 'SAUNA');

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 50,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "total_rewards" INTEGER NOT NULL DEFAULT 0,
    "visited_places" INTEGER NOT NULL DEFAULT 0,
    "sold_images" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_passwords" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_passwords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_addresses" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "region" TEXT,
    "city" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "latitude" TEXT,
    "longitude" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_pfps" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_pfps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "businesses" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "BusinessType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_passwords" (
    "id" SERIAL NOT NULL,
    "business_id" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_passwords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_addresses" (
    "id" SERIAL NOT NULL,
    "business_id" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "region" TEXT,
    "city" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "latitude" TEXT,
    "longitude" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_pfps" (
    "id" SERIAL NOT NULL,
    "business_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_pfps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_header_pics" (
    "id" SERIAL NOT NULL,
    "business_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_header_pics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "business_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_passwords_customer_id_key" ON "customer_passwords"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_addresses_customer_id_key" ON "customer_addresses"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_pfps_customer_id_key" ON "customer_pfps"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_pfps_url_key" ON "customer_pfps"("url");

-- CreateIndex
CREATE UNIQUE INDEX "businesses_email_key" ON "businesses"("email");

-- CreateIndex
CREATE UNIQUE INDEX "business_passwords_business_id_key" ON "business_passwords"("business_id");

-- CreateIndex
CREATE UNIQUE INDEX "business_addresses_business_id_key" ON "business_addresses"("business_id");

-- CreateIndex
CREATE UNIQUE INDEX "business_pfps_business_id_key" ON "business_pfps"("business_id");

-- CreateIndex
CREATE UNIQUE INDEX "business_pfps_url_key" ON "business_pfps"("url");

-- CreateIndex
CREATE UNIQUE INDEX "business_header_pics_business_id_key" ON "business_header_pics"("business_id");

-- CreateIndex
CREATE UNIQUE INDEX "business_header_pics_url_key" ON "business_header_pics"("url");

-- CreateIndex
CREATE UNIQUE INDEX "posts_url_key" ON "posts"("url");

-- CreateIndex
CREATE UNIQUE INDEX "posts_customer_id_url_key" ON "posts"("customer_id", "url");

-- AddForeignKey
ALTER TABLE "customer_passwords" ADD CONSTRAINT "customer_passwords_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_addresses" ADD CONSTRAINT "customer_addresses_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_pfps" ADD CONSTRAINT "customer_pfps_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_passwords" ADD CONSTRAINT "business_passwords_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_addresses" ADD CONSTRAINT "business_addresses_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_pfps" ADD CONSTRAINT "business_pfps_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_header_pics" ADD CONSTRAINT "business_header_pics_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
