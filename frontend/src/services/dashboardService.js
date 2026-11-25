
import { getProblems } from "./problemService";
import { getMySubmissions } from "./submissionService";

export const getSolverDashboard = async () => {
  const [problems, submissions] = await Promise.all([
    getProblems(),
    getMySubmissions(),
  ]);

  const activeStatuses = ["PENDING", "ACCEPTED"];

  const activeSubmissions = submissions.filter((submission) =>
    activeStatuses.includes(submission.status)
  );

  const submittedProblemIds = [
    ...new Set(submissions.map((submission) => submission.problemId)),
  ];

  const activeProblems = submittedProblemIds
    .map((problemId) => {
      const problem = problems.find(
        (item) => item.id === problemId
      );

      const submission = submissions.find(
        (item) => item.problemId === problemId
      );

      if (!problem || !submission) {
        return null;
      }

      return {
        id: problem.id,
        category: problem.category || "GENERAL",
        title: problem.title,
        description: problem.description,
        status: submission.status,
      };
    })
    .filter(Boolean);

  return {
    stats: {
      explored: problems.length,
      active: activeSubmissions.length,
      submitted: submissions.length,
    },
    activeProblems,
  };
};
