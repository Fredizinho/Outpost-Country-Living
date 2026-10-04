import { Navigation, NavigationProps } from './Navigation';
import { SettingsModalTab } from '../layout/SettingsAndAboutModal';

export interface HeaderProps extends NavigationProps {
  onOpenCitations: () => void;
  onOpenSearch?: () => void;
  onOpenAdvisor?: () => void;
  onToggleInspector?: () => void;
  isInspectorOpen?: boolean;
  onOpenSettings?: (tab?: SettingsModalTab) => void;
}

export function Header({
  onOpenCitations,
  onOpenSearch,
  onOpenAdvisor,
  onToggleInspector,
  isInspectorOpen,
  onOpenSettings,
}: HeaderProps) {
  return (
    <Navigation
      onOpenCitations={onOpenCitations}
      onOpenSearch={onOpenSearch}
      onOpenAdvisor={onOpenAdvisor}
      onToggleInspector={onToggleInspector}
      isInspectorOpen={isInspectorOpen}
      onOpenSettings={onOpenSettings}
    />
  );
}

export default Header;

