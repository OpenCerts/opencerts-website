declare module "*.scss" {
  interface ClassNames {
    [className: string]: string;
  }
  const classNames: ClassNames;
  export = classNames;
}

interface LaunchParams {
  // https://gist.github.com/screeny05/b1b7cbeb81479ece36dae21a9ee17d30 ?
  files: FileSystemFileHandle[];
}

interface Window {
  ga: UniversalAnalytics.ga;
  launchQueue: {
    setConsumer: (callback: (launchParams: LaunchParams) => void) => void;
  };
}

declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
    }
  }
}
