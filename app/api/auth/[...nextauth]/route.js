import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // Import the credentials provider (for custom authentication)

// NextAuth configuration
const handler = NextAuth({
  providers: [
    // Credential-based authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Custom authentication logic here (e.g., check against a database)
        const { email, password } = credentials;

        // Example: Check user credentials (replace with your logic)
        const user = { id: 1, email: "test@example.com", name: "Test User" };

        // Validate credentials (for example, check the database)
        if (email === "test@example.com" && password === "password") {
          return user; // Return user object if credentials are valid
        } else {
          return null; // Return null if authentication fails
        }
      },
    }),
    // You can add more providers like Google, GitHub, etc., here if needed
  ],
  pages: {
    signIn: '/auth', // Redirect to your custom sign-in page
  },
  session: {
    strategy: "jwt", // Use JSON Web Token (JWT) for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to JWT token
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Add JWT token info to session
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
