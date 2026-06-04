export const TECH_ICONS = {
  vue: { label: "Vue", src: "/icons/tech/vue.svg" },
  fastapi: { label: "FastAPI", src: "/icons/tech/fastapi.svg" },
  python: { label: "Python", src: "/icons/tech/python.svg" },
  redis: { label: "Redis", src: "/icons/tech/redis.svg" },
  react: { label: "React", src: "/icons/tech/react.svg" },
  nextjs: { label: "Next.js", src: "/icons/tech/nextjs.svg" },
  typescript: { label: "TypeScript", src: "/icons/tech/typescript.svg" },
  nodejs: { label: "Node.js", src: "/icons/tech/nodejs.svg" },
  docker: { label: "Docker", src: "/icons/tech/docker.svg" },
  postgresql: { label: "PostgreSQL", src: "/icons/tech/postgresql.svg" },
  mongodb: { label: "MongoDB", src: "/icons/tech/mongodb.svg" },
  kubernetes: { label: "Kubernetes", src: "/icons/tech/kubernetes.svg" },
  nginx: { label: "Nginx", src: "/icons/tech/nginx.svg" },
  django: { label: "Django", src: "/icons/tech/django.svg" },
  go: { label: "Go", src: "/icons/tech/go.svg" },
  tailwindcss: { label: "Tailwind", src: "/icons/tech/tailwindcss.svg" },
  figma: { label: "Figma", src: "/icons/tech/figma.svg" },
  git: { label: "Git", src: "/icons/tech/git.svg" },
  openai: { label: "OpenAI", src: "/icons/tech/openai.svg" },
  pytorch: { label: "PyTorch", src: "/icons/tech/pytorch.svg" },
  tensorflow: { label: "TensorFlow", src: "/icons/tech/tensorflow.svg" },
  elasticsearch: { label: "Elasticsearch", src: "/icons/tech/elasticsearch.svg" },
  rabbitmq: { label: "RabbitMQ", src: "/icons/tech/rabbitmq.svg" },
  kafka: { label: "Kafka", src: "/icons/tech/kafka.svg" },
  express: { label: "Express", src: "/icons/tech/express.svg" },
  nestjs: { label: "NestJS", src: "/icons/tech/nestjs.svg" },
  prisma: { label: "Prisma", src: "/icons/tech/prisma.svg" },
  supabase: { label: "Supabase", src: "/icons/tech/supabase.svg" },
  graphql: { label: "GraphQL", src: "/icons/tech/graphql.svg" },
  flutter: { label: "Flutter", src: "/icons/tech/flutter.svg" },
  dart: { label: "Dart", src: "/icons/tech/dart.svg" },
  swift: { label: "Swift", src: "/icons/tech/swift.svg" },
  kotlin: { label: "Kotlin", src: "/icons/tech/kotlin.svg" },
  java: { label: "Java", src: "/icons/tech/java.svg" },
  spring: { label: "Spring", src: "/icons/tech/spring.svg" },
  aws: { label: "AWS", src: "/icons/tech/aws.svg" },
  gcp: { label: "GCP", src: "/icons/tech/gcp.svg" },
  azure: { label: "Azure", src: "/icons/tech/azure.svg" },
} as const;

export type TechIconId = keyof typeof TECH_ICONS;

/**
 * Resolves a tech icon entry by id or returns undefined for unknown ids.
 */
export function getTechIcon(id: TechIconId) {
  return TECH_ICONS[id];
}
