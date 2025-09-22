
export interface TabConfig {
  id: number;
  label: string;
  component: React.ReactNode;
  condition?: boolean;
}

export interface TabsProps {
  tabsConfig?: TabConfig[];
  defaultTab?: number;
}
