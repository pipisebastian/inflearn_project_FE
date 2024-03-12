export interface Note {
  // 내용
  id: number;
  title: string;
  content: string;
  createdDate: Date;
  // 우선순위, pin 여부
  isHighPriority: boolean;
  isPinned: boolean;
  // 태그
  selectedTags: string[];
  // 색상
  color: 'WHITE' | 'SKY';
  // 상태 (활성, 보관, 삭제)
  state: 'ACTIVE' | 'ARCHIVED' | 'DELETED';
}
