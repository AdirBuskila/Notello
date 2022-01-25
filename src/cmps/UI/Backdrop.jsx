export const Backdrop = ({ onClick, children }) => {
  return (
    <div className='backdrop' onClick={onClick}>
      {children}
    </div>
  );
};
