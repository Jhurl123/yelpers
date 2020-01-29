export interface tabContent {
  imageSrc: string;
  headerText: string;
  bodyText: string;
  linkText: string;
  linkRoute: string;
}

export interface tab {
  id: number;
  iconSrc: string;
  iconAlt: string;
  text: string;
  content: {
    [key: string]: tabContent
  };
  active: boolean;
}
