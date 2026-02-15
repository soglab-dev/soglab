export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  slug: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "AI 기반 챗봇 시스템",
    description: "LLM 기반 고객 지원 챗봇으로 자연어 질문 이해 및 답변 생성",
    image: "https://placehold.co/600x400/e2e8f0/0f172a?text=AI+Chatbot",
    tags: ["Python", "LangChain", "OpenAI", "FastAPI"],
    slug: "ai-chatbot",
  },
  {
    id: 2,
    title: "실시간 멀티플레이어 게임",
    description: "WebSocket 기반 실시간 동기화 게임 서버",
    image: "https://placehold.co/600x400/e2e8f0/0f172a?text=Multiplayer+Game",
    tags: ["Node.js", "WebSocket", "Redis", "React"],
    slug: "multiplayer-game",
  },
  {
    id: 3,
    title: "컴퓨터 비전 분석 도구",
    description: "이미지 처리 및 객체 검출을 위한 CV 분석 플랫폼",
    image: "https://placehold.co/600x400/e2e8f0/0f172a?text=Computer+Vision",
    tags: ["Python", "OpenCV", "TensorFlow", "Flask"],
    slug: "cv-tool",
  },
  {
    id: 4,
    title: "클라우드 관리 대시보드",
    description: "인프라 모니터링 및 리소스 관리 시스템",
    image: "https://placehold.co/600x400/e2e8f0/0f172a?text=Cloud+Dashboard",
    tags: ["React", "TypeScript", "AWS", "GraphQL"],
    slug: "cloud-dashboard",
  },
  {
    id: 5,
    title: "게임 AI 엔진",
    description: "강화학습 기반 NPC 행동 및 의사결정 시스템",
    image: "https://placehold.co/600x400/e2e8f0/0f172a?text=Game+AI",
    tags: ["Python", "PyTorch", "RL", "Unity"],
    slug: "game-ai",
  },
  {
    id: 6,
    title: "자연어 처리 파이프라인",
    description: "텍스트 분석, 감성 분류, 요약 자동화 플랫폼",
    image: "https://placehold.co/600x400/e2e8f0/0f172a?text=NLP+Pipeline",
    tags: ["Python", "Hugging Face", "spaCy", "Kubernetes"],
    slug: "nlp-pipeline",
  },
];
