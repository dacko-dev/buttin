-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Button" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "title" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "backgroundImg" TEXT,
    "borderRadius" INTEGER NOT NULL DEFAULT 0,
    "borderStyle" TEXT NOT NULL DEFAULT 'none',
    "hoverState" JSONB,
    "clickState" JSONB,
    "clickedState" JSONB,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "maxClicks" INTEGER NOT NULL DEFAULT 100,
    "size" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "message" TEXT,
    "messageColor" TEXT,
    "messageBg" TEXT,
    "messageBgImg" TEXT,
    "animation" JSONB,
    "behavior" JSONB,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "creatorId" TEXT NOT NULL,
    "uniqueClicks" INTEGER NOT NULL DEFAULT 0,
    "wallId" INTEGER NOT NULL,

    CONSTRAINT "Button_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ButtonClick" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "buttonId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ButtonClick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wall" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "description" TEXT,
    "maxClicks" INTEGER NOT NULL DEFAULT 10000,

    CONSTRAINT "Wall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RW_DataMigration" (
    "version" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RW_DataMigration_pkey" PRIMARY KEY ("version")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Button_creatorId_idx" ON "Button"("creatorId");

-- CreateIndex
CREATE INDEX "Button_wallId_idx" ON "Button"("wallId");

-- CreateIndex
CREATE INDEX "Button_isVisible_idx" ON "Button"("isVisible");

-- CreateIndex
CREATE INDEX "Button_clickCount_idx" ON "Button"("clickCount");

-- CreateIndex
CREATE INDEX "Button_uniqueClicks_idx" ON "Button"("uniqueClicks");

-- CreateIndex
CREATE INDEX "Button_createdAt_idx" ON "Button"("createdAt");

-- CreateIndex
CREATE INDEX "ButtonClick_buttonId_idx" ON "ButtonClick"("buttonId");

-- CreateIndex
CREATE INDEX "ButtonClick_userId_idx" ON "ButtonClick"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Wall_number_key" ON "Wall"("number");

-- CreateIndex
CREATE INDEX "Wall_number_idx" ON "Wall"("number");

-- CreateIndex
CREATE INDEX "Wall_createdAt_idx" ON "Wall"("createdAt");

-- AddForeignKey
ALTER TABLE "Button" ADD CONSTRAINT "Button_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Button" ADD CONSTRAINT "Button_wallId_fkey" FOREIGN KEY ("wallId") REFERENCES "Wall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ButtonClick" ADD CONSTRAINT "ButtonClick_buttonId_fkey" FOREIGN KEY ("buttonId") REFERENCES "Button"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ButtonClick" ADD CONSTRAINT "ButtonClick_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
