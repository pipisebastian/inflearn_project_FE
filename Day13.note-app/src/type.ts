export interface Note {
  id: number;
  title: string;
  content: string;
  selectedTags: string[];
  createdAt: Date;
  isHighPriority: boolean;
  isPinned: boolean;
  backgroundColor: "WHITE" | "SKY";
  state: "ACTIVE" | "ARCHIVED" | "DELETED";
}
