import { Navigation, NavigationProps } from './Navigation';

export interface HeaderProps extends NavigationProps {
  onOpenCitations: () => void;
  onOpenSearch?: () => void;
}

export function Header({
  onOpenCitations,
  onOpenSearch
}: HeaderProps) {
  return (
    <Navigation
      onOpenCitations={onOpenCitations}
      onOpenSearch={onOpenSearch}
    />
  );
}

export default Header;

