import { Node, Edge } from "@xyflow/react";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
  content: string;
}

export interface DiagramConfig {
  nodes: Node[];
  edges: Edge[];
}
