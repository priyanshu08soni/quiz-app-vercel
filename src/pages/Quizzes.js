import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import { BookCopy } from "lucide-react";
import QuizzesCard from "../components/QuizzesCard";
import { getAllQuizzes } from "../api/quizzes"; // 👈 imported

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizzesData = await getAllQuizzes(); // 👈 use API
        setQuizzes(quizzesData);
      } catch (err) {
        setError(err.message || "An error occurred");
        toast.error("Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <Navbar />
      <section className="container mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <BookCopy className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-gray-900">Available Quizzes</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {quizzes.map((quiz) => (
            <QuizzesCard
              key={quiz._id}
              icon={BookCopy}
              title={quiz.title}
              description={quiz.description}
              quizId={quiz._id}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Quizzes;
