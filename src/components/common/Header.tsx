import { Navigation, NavigationProps } from './Navigation';

export interface HeaderProps extends NavigationProps {
  onOpenCitations: () => void;
  onOpenSearch?: () => void;
  onOpenAdvisor?: () => void;
}

export function Header({
  onOpenCitations,
  onOpenSearch,
  onOpenAdvisor
}: HeaderProps) {
  return (
    <Navigation
      onOpenCitations={onOpenCitations}
      onOpenSearch={onOpenSearch}
      onOpenAdvisor={onOpenAdvisor}
    />
  );
}

export default Header;

