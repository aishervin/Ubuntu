export interface RepoFile {
  name: string;
  path: string;
  language: string;
  size: string;
  description: string;
  content: string;
}

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  content: string;
}

export interface DeployStep {
  step: number;
  title: string;
  description: string;
  command?: string;
  badge?: string;
}
