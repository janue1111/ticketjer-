<div align="center"> <br /> <a href="https://youtu.be/zgGhzuBZOQg" target="_blank">
 <img src="./public/assets/images/mylogo.jpg"
  alt="Project Banner" /> </a> <br /> <div>
   <img src="https://img.shields.io/badge/-Next.js_14-black?style=for-the-badge&logo=nextdotjs&logoColor=white&color=000000" alt="Next.js" /> 
  <img src="https://img.shields.io/badge/-TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white&color=3178C6" alt="TypeScript" /> 
  <img src="https://img.shields.io/badge/-Stripe-blue?style=for-the-badge&logo=stripe&logoColor=white&color=008CDD" alt="Stripe" />
</div>
 <h1 align="center">🎟️ TicketiHub</h1>
 <h3 align="center">A Next.js 14-powered Event Management and Ticketing Platform</h3>
  <p align="center">Easily discover, create, and manage events while ensuring secure ticket purchases with Stripe integration.</p> </div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets](#snippets)
6. 🔗 [Links](#links)
7. 🚀 [More](#more)

## <a name="introduction">🤖 Introduction</a>

TicketiHub is a robust, full-stack application for event management and ticketing, designed to simplify how users interact with events worldwide. Built on Next.js 14, this platform allows users to:

- Seamlessly browse and filter events based on categories or organizers.
- Securely purchase tickets via Stripe.
- Effortlessly create, update, and manage events.
- Explore curated related events to enhance engagement.
- Whether you’re an event organizer or attendee, TicketiHub offers a streamlined, scalable, and secure experience tailored for everyone.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Node.js
- Next.js
- TypeScript
- TailwindCSS
- Stripe
- Zod
- React Hook Form
- Shadcn
- uploadthing

## <a name="features">🔋 Features</a>

👉 **Authentication (CRUD) with Clerk:** User management through Clerk, ensuring secure and efficient authentication.

👉 **Events (CRUD):** Comprehensive functionality for creating, reading, updating, and deleting events, giving users full control over event management.

- **Create Events:** Users can effortlessly generate new events, providing essential details such as title, date, location, and any additional information.
- **Read Events:** Seamless access to a detailed view of all events, allowing users to explore event specifics, including descriptions, schedules, and related information.
- **Update Events:** Empowering users to modify event details dynamically, ensuring that event information remains accurate and up-to-date.
- **Delete Events:** A straightforward process for removing events from the system, giving administrators the ability to manage and curate the platform effectively.

👉 **Related Events:** Smartly connects events that are related and displaying on the event details page, making it more engaging for users

👉 **Organized Events:** Efficient organization of events, ensuring a structured and user-friendly display for the audience, i.e., showing events created by the user on the user profile

👉 **Search & Filter:** Empowering users with a robust search and filter system, enabling them to easily find the events that match their preferences.

👉 **New Category:** Dynamic categorization allows for the seamless addition of new event categories, keeping your platform adaptable.

👉 **Checkout and Pay with Stripe:** Smooth and secure payment transactions using Stripe, enhancing user experience during the checkout process.

👉 **Event Orders:** Comprehensive order management system, providing a clear overview of all event-related transactions.

👉 **Search Orders:** Quick and efficient search functionality for orders, facilitating easy tracking and management.

and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
#NEXT
NEXT_PUBLIC_SERVER_URL=

#CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_CLERK_WEBHOOK_SECRET=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

#MONGODB
MONGODB_URI=

#UPLOADTHING
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

#STRIPE
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

Replace the placeholder values with your actual credentials

**Running the Project**

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
