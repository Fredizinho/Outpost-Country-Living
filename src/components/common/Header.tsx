import { Navigation, NavigationProps } from './Navigation';

export interface HeaderProps extends NavigationProps {
  onOpenCitations: () => void;
  onOpenSearch?: () => void;
  onOpenAdvisor?: () => void;
  onToggleInspector?: () => void;
  isInspectorOpen?: boolean;
}

export function Header({
  onOpenCitations,
  onOpenSearch,
  onOpenAdvisor,
  onToggleInspector,
  isInspectorOpen,
}: HeaderProps) {
  return (
    <Navigation
      onOpenCitations={onOpenCitations}
      onOpenSearch={onOpenSearch}
      onOpenAdvisor={onOpenAdvisor}
      onToggleInspector={onToggleInspector}
      isInspectorOpen={isInspectorOpen}
    />
  );
}

export default Header;

