# Placement Path

# SYSTEM ROLE

You are a senior full-stack engineer, UI/UX designer, product architect, and startup CTO.

Your task is to build a complete production-ready SaaS Progressive Web App called **APTIVIO**.

Do NOT create a clone of any existing platform. Create an original product with similar functionality but a superior UX, scalable architecture, and original content.

---

# PRODUCT

## Name

APTIVIO

## Tagline

10 minutes a day. Placement ready.

## Mission

Aptivio is an AI-powered placement readiness platform for college students.

Version 1 launches for **B.Tech** students.

Later it must support BBA, BCA, BSc, MBA and every major degree using the same platform.

Everything should be modular so adding a new stream only changes content, not code.

---

# DESIGN LANGUAGE

Premium startup aesthetic.

Inspired by:

- Linear

- Notion

- Apple

- Duolingo gamification

Theme:

- Matte black

- White

- Gold accent (#D4AF37)

- Soft gray surfaces

- Rounded 2xl cards

- Smooth Framer Motion animations

The UI should feel worth ₹999/month even if priced at ₹99.

Mobile-first.

Desktop responsive.

---

# TECH STACK

- Next.js 15 (App Router)

- TypeScript

- Tailwind CSS

- Firebase Authentication

- Cloud Firestore

- Firebase Storage

- PWA (installable)

- Framer Motion

- React Hook Form

- Zod

- Recharts

Use clean architecture and reusable components.

---

# USER ROLES

1. Student

2. Admin

3. Super Admin (future ready)

---

# AUTHENTICATION

Allow:

- Email OTP

- Google Login

During onboarding ask:

- Full Name

- College

- Degree

- Branch

- Graduation Year

- Target Companies (multiple select)

Examples:

TCS, Infosys, Accenture, Capgemini, Deloitte, Amazon, Microsoft

Store in Firestore.

---

# APP STRUCTURE

## Splash

Animated Aptivio logo.

## Onboarding

3 premium screens introducing:

- Daily placement prep

- Business news

- Rewards & streaks

## Dashboard

Display:

- Current streak

- XP

- Level

- Rank

- Today's progress

- 30-day challenge

Buttons:

Morning (10)

Evening (10)

Resume later if incomplete.

---

# DAILY ENGINE

Every day contains exactly 20 questions.

Morning:

- 2 Business News

- 2 Aptitude

- 2 Verbal

- 2 HR Interview

- 2 Technical

Evening:

- Mixed revision

- Startup case

- SQL/Programming

- Logical reasoning

- Company-specific HR

Question types:

- MCQ

- Multi-select

- True/False

- Arrange order

Each question includes:

{

 id,

 category,

 difficulty,

 companyTags[],

 question,

 options[],

 correctAnswer,

 explanation,

 sourceType

}

Never hardcode questions.

Load them from Firestore daily_sets collection.

---

# BUSINESS NEWS

Each news card contains:

Headline

60-word summary

Why it matters

Likely interview question

MCQ generated from the article

Store separately from questions.

---

# AI FEATURES

Create architecture for AI generation.

Admin presses:

"Generate Tomorrow"

System creates:

- 2 business news cards

- 4 aptitude

- 4 verbal

- 4 HR

- 6 technical

Use placeholders for AI API.

Keep providers swappable.

---

# GAMIFICATION

XP

Easy = 2 XP

Medium = 3 XP

Hard = 5 XP

Correct streak bonus.

Levels:

Explorer

Learner

Performer

Achiever

Elite

Legend

Shields:

Earn 1 shield every 15 consecutive days.

Automatically protect one missed day.

---

# LEADERBOARD

Tabs:

Daily

Weekly

Monthly

All Time

Show:

Rank

Name

XP

Accuracy

Search users.

Realtime Firestore updates.

---

# PROFILE

Show:

Avatar

Name

College

Branch

Degree

Current Level

XP

Accuracy

Questions Solved

Strongest Category

Weakest Category

Achievement badges

---

# REWARDS

Day 10

Resume Kit

Day 20

Interview Question Bank

Day 30

Placement Certificate

Monthly subscribers unlock new downloadable kits.

Admin can upload PDFs.

---

# ANALYTICS

Track:

Daily active users

Completion rate

Average accuracy

Most difficult questions

Weak topics

Retention

Prepare Firestore schema.

---

# ADMIN DASHBOARD

Route:

/admin

Features:

- Create question

- Edit question

- Delete question

- Upload business news

- Generate tomorrow's quiz

- Publish morning

- Publish evening

- Manage users

- Upload reward files

- View analytics

Beautiful dark dashboard.

---

# FIRESTORE SCHEMA

Design complete collections.

Include:

users

questions

daily_sets

news

leaderboards

rewards

analytics

streaks

notifications

Use proper indexes.

---

# COMPONENTS

Build reusable components:

StatCard

XPProgress

QuestionCard

NewsCard

LeaderboardTable

BottomNavigation

StreakRing

RewardCard

LevelBadge

AnimatedButton

Skeleton loaders

Empty states

---

# PWA

Support:

Offline cache

Install prompt

Splash icon

Manifest

Push notification architecture

Reminder notifications:

8:00 AM

8:00 PM

---

# SEED DATA

Generate:

- 500 ORIGINAL placement questions

- 100 aptitude

- 100 verbal

- 100 HR

- 100 technical

- 100 business awareness

Every question must include explanations.

Do not copy from existing platforms.

---

# PROJECT STRUCTURE

Generate the complete folder tree.

Write every file.

Include:

package.json

firebase.ts

firestore.rules

tailwind.config

manifest.json

Service worker

README

Deployment guide for Vercel + Firebase

The result should be production-ready, scalable, and written like a real startup codebase.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://apti-prep-pro.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4ddd648d-0cad-4e4a-8f4b-729d17c67052).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
