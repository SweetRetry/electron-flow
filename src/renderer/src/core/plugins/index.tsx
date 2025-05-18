import Placeholder from "./Placeholder";

const CanRegisterPlugins = {
  placeholder: {
    component: Placeholder,
  },
};

const RegisterPlugins = ({ plugins }: { plugins: (keyof typeof CanRegisterPlugins)[] }) => {
  return (
    <>
      {plugins.map((plugin) => {
        const Plugin = CanRegisterPlugins[plugin];
        return <Plugin.component key={plugin} />;
      })}
    </>
  );
};

export default RegisterPlugins;
