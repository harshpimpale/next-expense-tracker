# 💸 Expense Tracker

>A modern, full-stack expense tracking web app built with Next.js, TypeScript, MongoDB, and Tailwind CSS.

## 🚀 Features

- **User Authentication**: Secure signup, login, and logout flows
- **Expense Management**: Add, view, filter, and delete expenses
- **Analytics Dashboard**: Visualize spending by category and over time
- **Filtering**: Filter expenses by date range and category
- **Responsive UI**: Beautiful, mobile-friendly design with Tailwind CSS
- **Persistent Storage**: Data stored securely in MongoDB

## 🖥️ Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB & Mongoose](https://mongoosejs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) for password hashing

## 📸 Screenshots

<p align="center">
  <img src="public/screenshot-dashboard.png" alt="Dashboard Screenshot" width="600"/>
</p>

## 🏁 Getting Started

1. **Clone the repository**
	```bash
	git clone https://github.com/your-username/expense-tracker.git
	cd expense-tracker
	```
2. **Install dependencies**
	```bash
	npm install
	# or
	yarn install
	```
3. **Set up environment variables**
	- Create a `.env.local` file in the root directory:
	  ```env
	  MONGODB_URI=your_mongodb_connection_string
	  JWT_SECRET=your_jwt_secret
	  ```
4. **Run the development server**
	```bash
	npm run dev
	# or
	yarn dev
	```
5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 🗂️ Project Structure

- `app/` — Next.js app directory (routes, pages, API)
- `components/` — Reusable React components (Navbar, ExpenseForm, Analytics, etc.)
- `lib/` — Database, models, and utility functions
- `public/` — Static assets

## 🛡️ Security

- Passwords are hashed using bcryptjs
- JWT-based authentication for API routes

## 📊 Analytics

- Visual breakdown of expenses by category
- Total spending summary

## 🧑‍💻 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  Built with ❤️ using Next.js & MongoDB
</p>
