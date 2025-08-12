export interface MenuProps {
  headerMenu: MenuItemProps[];
}

export interface MenuItemProps {
  id: number;
  title: string;
  link: string;
  addChevron: boolean;
}
