import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions"; // Make sure this path is correct
import prisma from "@/utils/prisma"; // Make sure this path is correct

export default async function ProfilePage() {
  // 1. Get the session on the server
  const session = await getServerSession(authOptions);

  // 2. Handle the case where the user is not logged in
  if (!session?.user?.email) {
    return (
      <div className="text-center text-2xl text-red-500 p-16">
        <p>Access Denied. Please log in to view this page.</p>
      </div>
    );
  }

  // 3. Fetch the user and their posts from the database
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      posts: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  // 4. Handle the case where the user is not found in the database
  if (!currentUser) {
    return (
        <div className="text-center text-2xl text-red-500 p-16">
            <p>User not found in database.</p>
        </div>
    );
  }

  // 5. Render the user's posts
  return (
    <div className="max-w-4xl mx-auto p-16">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Your Prompts, {currentUser.name}
      </h1>
      <div className="space-y-4">
        {/* Use parentheses () for an implicit return in the map function */}
        {currentUser.posts.length > 0 ? (
            currentUser.posts.map((post) => (
                <div key={post.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <p className="text-lg text-amber-300">{post.prompt}</p>
                    <p>{post.url}</p>
                </div>
            ))
        ) : (
            <p className="text-center text-gray-400">You have no posts yet.</p>
        )}
      </div>
    </div>
  );
}
