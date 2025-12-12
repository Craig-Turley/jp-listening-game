// types
type LayoutFC = React.ComponentType<React.PropsWithChildren<unknown>>;

type LayoutsProps = {
  layouts: LayoutFC | LayoutFC[];
  children: React.ReactNode;
};

export const Layouts: React.FC<LayoutsProps> = ({ layouts, children }) => {
  const arr = Array.isArray(layouts) ? layouts : [layouts];
  return arr.reduceRight<React.ReactNode>((acc, L) => <L>{acc}</L>, children);
};

type WithLayoutsProps<P = {}> = {
  layouts: LayoutFC | LayoutFC[];
  page: React.ComponentType<P>;
  pageProps?: P;
};

export const WithLayouts = <P extends {}>({
  layouts,
  page: Page,
  pageProps,
}: WithLayoutsProps<P>) => {
  return (
    <Layouts layouts={layouts}>
      <Page {...(pageProps as P)} />
    </Layouts>
  );
};


