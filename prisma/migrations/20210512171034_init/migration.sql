-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('USER', 'AGENT', 'ADMIN');

-- CreateTable
CREATE TABLE "Auth" (
    "userEmail" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    PRIMARY KEY ("userEmail")
);

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "UserType" NOT NULL,
    "agencyId" UUID,

    PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Agency" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listing" (
    "mlsn" CHAR(7) NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "sqft" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" DECIMAL(65,30) NOT NULL,
    "hoa" BOOLEAN NOT NULL,
    "rooms" TEXT[],
    "images" TEXT[],
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" CHAR(2) NOT NULL,
    "zipcode" INTEGER NOT NULL,
    "agentEmail" TEXT NOT NULL,
    "occupied" BOOLEAN NOT NULL,
    "alarmInfo" TEXT NOT NULL,
    "dailyHits" INTEGER NOT NULL,

    PRIMARY KEY ("mlsn")
);

-- CreateTable
CREATE TABLE "School" (
    "name" TEXT NOT NULL,
    "grades" INTEGER[],

    PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Showing" (
    "when" TIMESTAMP(3) NOT NULL,
    "confirmed" BOOLEAN NOT NULL,
    "userEmail" TEXT NOT NULL,
    "listingMlsn" CHAR(7) NOT NULL,

    PRIMARY KEY ("listingMlsn")
);

-- CreateTable
CREATE TABLE "_liked" (
    "A" CHAR(7) NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ListingToSchool" (
    "A" CHAR(7) NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_liked_AB_unique" ON "_liked"("A", "B");

-- CreateIndex
CREATE INDEX "_liked_B_index" ON "_liked"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ListingToSchool_AB_unique" ON "_ListingToSchool"("A", "B");

-- CreateIndex
CREATE INDEX "_ListingToSchool_B_index" ON "_ListingToSchool"("B");

-- AddForeignKey
ALTER TABLE "Auth" ADD FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD FOREIGN KEY ("agentEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Showing" ADD FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Showing" ADD FOREIGN KEY ("listingMlsn") REFERENCES "Listing"("mlsn") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_liked" ADD FOREIGN KEY ("A") REFERENCES "Listing"("mlsn") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_liked" ADD FOREIGN KEY ("B") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListingToSchool" ADD FOREIGN KEY ("A") REFERENCES "Listing"("mlsn") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListingToSchool" ADD FOREIGN KEY ("B") REFERENCES "School"("name") ON DELETE CASCADE ON UPDATE CASCADE;
