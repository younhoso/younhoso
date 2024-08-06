interface VerticalDividerProps {
  height?: number;
  className?: string;
}

const VerticalDivider = (props: VerticalDividerProps) => {
  const { height, className, ...rest } = props;
  return (
    <div
      style={{
        borderLeft: '1px solid #dcdde2',
        height: height ? height : '100%',
      }}
      className={className}
      {...rest}
    />
  );
};

export default VerticalDivider;
