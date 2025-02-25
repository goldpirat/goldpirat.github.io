import { useQuery } from "@tanstack/react-query";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { Parallax } from "react-parallax";

const GITHUB_USERNAME = "goldpirat";
const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_ACCESS_TOKEN = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;

const fetchPinnedProjects = async () => {
  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              id
              name
              description
              stargazers {
                totalCount
              }
              url
              homepageUrl
              primaryLanguage {
                name
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch pinned GitHub repositories");
  }

  const { data } = await response.json();
  return data.user.pinnedItems.nodes;
};

const Projects = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pinned-github-projects"],
    queryFn: fetchPinnedProjects,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-navy">
        <div className="text-teal-600">Loading pinned projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-navy">
        <div className="text-red-500">Error loading projects. Please try again later.</div>
      </div>
    );
  }

  return (
    <Parallax blur={0} bgImage="/placeholder.svg" strength={200} className="min-h-screen">
      <section id="projects" className="min-h-screen bg-white dark:bg-navy py-20 px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-12 text-center text-black dark:text-white">
            My Pinned Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((repo: any) => (
              <ProjectCard
                key={repo.id}
                name={repo.name}
                description={repo.description || "No description available"}
                stars={repo.stargazers.totalCount}
                url={repo.url}
                homepage={repo.homepageUrl}
                language={repo.primaryLanguage?.name}
              />
            ))}
          </div>
        </motion.div>
      </section>
    </Parallax>
  );
};

export default Projects;
